export interface ConfigPerfilPdv {
    id: number
    property: string
    value: string,
    perfilId: number 
}

export interface PerfilPdv{
    id: number
    descricao: string
    confPerfil: ConfigPerfilPdv[];
}
