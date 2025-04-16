import { TypePerfilPdv } from "./typesPerfisDeCaixa"

export type TypeCaixas = {
    id: number
    descricao: string
    empresaId: number
    perfilPdv: TypePerfilPdv
}