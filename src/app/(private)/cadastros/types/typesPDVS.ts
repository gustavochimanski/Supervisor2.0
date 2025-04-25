
export type TypeCaixas = {
    id: number
    descricao: string
    enderecoIp: string
    empresaId: number
    perfilPdv: TypePerfilPdv
}

export type TypePerfilPdv = {
    id: string;
    descricao: string;
  }
  
  export type PatchConfPerfilPayload = {
    id: number;
    property: string;
    value: string;
    perfilId: number;
  }
  