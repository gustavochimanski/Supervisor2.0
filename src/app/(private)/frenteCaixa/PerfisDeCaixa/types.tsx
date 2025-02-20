// types.ts
export interface PerfilPdv {
    id: string;
    descricao: string;
    confPerfil: PatchConfPerfilPayload[]
  }
  
  export interface PatchConfPerfilPayload {
    id: number;
    property: string;
    value: string;
    perfilId: number;
  }
  
  export interface PutConfPerfilParams {
    idPerfil: string;
    payload: PatchConfPerfilPayload | '';
  }
  