// app/api/proxy/[...path]/route.ts
import { NextRequest, NextResponse } from "next/server";

async function handleRequest(
  request: NextRequest,
  context: { params: { path: string[] } },
  method: string
) {
  // Aguarda os parâmetros explicitamente
  const params = await Promise.resolve(context.params);
  // Monta a URL de destino, ex.: http://localhost:8080/v1/config/meiospgto
  const targetUrl = `http://localhost:8080/${params.path.join("/")}`;
  
  // Anexa os query params à URL de destino
  const { searchParams } = new URL(request.url);
  const finalUrl = `${targetUrl}?${searchParams.toString()}`;

  // Para métodos que enviam body (POST, PUT, PATCH), leia o corpo da requisição
  let body: string | undefined = undefined;
  if (method !== "GET" && method !== "DELETE") {
    body = await request.text();
  }

  // Faz a requisição para o servidor real
  const res = await fetch(finalUrl, {
    method,
    headers: request.headers,
    body,
  });

  // Lê o corpo da resposta e clona os headers
  const responseBody = await res.arrayBuffer();
  const newHeaders = new Headers(res.headers);
  // Remove o cabeçalho que dispara o prompt de Basic Auth
  newHeaders.delete("WWW-Authenticate");

  return new NextResponse(responseBody, {
    status: res.status,
    headers: newHeaders,
  });
}

export async function GET(request: NextRequest, context: { params: { path: string[] } }) {
  return handleRequest(request, context, "GET");
}

export async function POST(request: NextRequest, context: { params: { path: string[] } }) {
  return handleRequest(request, context, "POST");
}

export async function PUT(request: NextRequest, context: { params: { path: string[] } }) {
  return handleRequest(request, context, "PUT");
}

export async function PATCH(request: NextRequest, context: { params: { path: string[] } }) {
  return handleRequest(request, context, "PATCH");
}

export async function DELETE(request: NextRequest, context: { params: { path: string[] } }) {
  return handleRequest(request, context, "DELETE");
}
