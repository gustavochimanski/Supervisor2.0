// File: src/app/api/proxy/[...path]/route.tsx

import * as entry from './route'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// =============================================================================
// UTILITÁRIOS DE TIPO (usados somente em tempo de compilação)

type TEntry = typeof import('./route')

type SegmentParams<T extends Object = any> = T extends Record<string, any>
  ? { [K in keyof T]: T[K] extends string ? string | string[] | undefined : never }
  : T

function checkFields<_ extends { [k in keyof any]: never }>() {}

type RevalidateRange<T> = T extends { revalidate: any } ? NonNegative<T['revalidate']> : never
type OmitWithTag<T, K extends keyof any, _M> = Omit<T, K>
type Diff<Base, T extends Base, Message extends string = ''> =
  0 extends (1 & T) ? {} : OmitWithTag<T, keyof Base, Message>

type FirstArg<T extends Function> =
  T extends (...args: [infer A, any]) => any ? unknown extends A ? any : A : never
type SecondArg<T extends Function> =
  T extends (...args: [any, infer A]) => any ? unknown extends A ? any : A : never
type MaybeField<T, K extends string> = T extends { [k in K]: infer G } ? (G extends Function ? G : never) : never
type ParamCheck<T> = { __tag__: string; __param_position__: string; __param_type__: T }

type Numeric = number | bigint
type Zero = 0 | 0n
type Negative<T extends Numeric> = T extends Zero ? never : `${T}` extends `-${string}` ? T : never
type NonNegative<T extends Numeric> = T extends Zero ? T : Negative<T> extends never ? T : '__invalid_negative_number__'

// =============================================================================
// VALIDAÇÕES DE TIPOS (em tempo de compilação)

// O RouteContext esperado:
type RouteContext = { params: Promise<{ path: string[] }> }

if ('GET' in entry) {
  checkFields<
    Diff<
      ParamCheck<Request | NextRequest>,
      {
        __tag__: 'GET'
        __param_position__: 'first'
        __param_type__: FirstArg<MaybeField<TEntry, 'GET'>>
      },
      'GET'
    >
  >()
  checkFields<
    Diff<
      ParamCheck<RouteContext>,
      {
        __tag__: 'GET'
        __param_position__: 'second'
        __param_type__: SecondArg<MaybeField<TEntry, 'GET'>>
      },
      'GET'
    >
  >()
  checkFields<
    Diff<
      {
        __tag__: 'GET',
        __return_type__: Response | void | never | Promise<Response | void | never>
      },
      {
        __tag__: 'GET',
        __return_type__: ReturnType<MaybeField<TEntry, 'GET'>>
      },
      'GET'
    >
  >()
}

// (Validações para HEAD, OPTIONS, POST, PUT, DELETE, PATCH e generateStaticParams seguem padrão similar)

// =============================================================================
// IMPLEMENTAÇÃO DO PROXY

async function handleRequest(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
  method: string
): Promise<NextResponse> {
  const resolvedParams = await context.params;
  // Monta a URL de destino, por exemplo: http://localhost:8080/v1/config/meiospgto
  const targetUrl = `http://localhost:8080/${resolvedParams.path.join("/")}`;

  // Anexa os query params à URL de destino
  const { searchParams } = new URL(request.url);
  const finalUrl = `${targetUrl}?${searchParams.toString()}`;

  // Para métodos que enviam body (POST, PUT, PATCH), leia o corpo da requisição
  let body: string | undefined = undefined;
  if (method !== "GET" && method !== "DELETE") {
    body = await request.text();
  }

  // Realiza a requisição para o servidor real
  const res = await fetch(finalUrl, {
    method,
    headers: request.headers,
    body,
  });

  // Lê o corpo da resposta e clona os headers
  const responseBody = await res.arrayBuffer();
  const newHeaders = new Headers(res.headers);
  newHeaders.delete("WWW-Authenticate");

  return new NextResponse(responseBody, {
    status: res.status,
    headers: newHeaders,
  });
}

// =============================================================================
// EXPORTAÇÃO DOS MÉTODOS HTTP
// Agora, o contexto é do tipo { params: Promise<{ path: string[] }> } em todas as funções.

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
): Promise<NextResponse> {
  return handleRequest(request, context, "GET");
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
): Promise<NextResponse> {
  return handleRequest(request, context, "POST");
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
): Promise<NextResponse> {
  return handleRequest(request, context, "PUT");
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
): Promise<NextResponse> {
  return handleRequest(request, context, "PATCH");
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
): Promise<NextResponse> {
  return handleRequest(request, context, "DELETE");
}
