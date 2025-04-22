// types.ts
export type TypePerfilPdv = {
  id: string;
  descricao: string;
  confPerfil: PatchConfPerfilPayload[]
}

export type PatchConfPerfilPayload = {
  id: number;
  property: string;
  value: string;
  perfilId: number;
}
