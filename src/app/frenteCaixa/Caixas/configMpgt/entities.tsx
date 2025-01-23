import { ConfiguracaoMeioPag } from "../types";

// Mapeamento de configurações manuais
export const configMap = [
    {
      id: 1,
      label: "Aciona Gaveta",
      property: "stringValue",
      options: [
        { value: "N", label: "Não" },
        { value: "S", label: "Sim" },
      ],
    },
    {
      id: 2,
      label: "Código Preço",
      property: "integerValue",
      options: [
        { value: "1", label: "Preço 1" },
        { value: "2", label: "Preço 2" },
        { value: "3", label: "Preço 3" },
      ],
    },
    {
      id: 3,
      label: "Cartão Digitado",
      property: "stringValue",
      options: [
        { value: "N", label: "Não" },
        { value: "S", label: "Sim" },
      ],
    },
    {
      id: 4,
      label: "Desconto Ticket",
      property: "doubleValue",
      options: [
        { value: "5", label: "5%" },
        { value: "10", label: "10%" },
        { value: "15", label: "15%" },
      ],
    },
    {
      id: 5,
      label: "Emite Contra Vale",
      property: "stringValue",
      options: [
        { value: "N", label: "Não" },
        { value: "S", label: "Sim" },
      ],
    },
    {
      id: 6,
      label: "Efetuar Sangria",
      property: "stringValue",
      options: [
        { value: "N", label: "Não" },
        { value: "S", label: "Sim" },
      ],
    },
    {
      id: 7,
      label: "Grupo Meio Pgto",
      property: "stringValue",
      options: [
        { value: "A", label: "Grupo A" },
        { value: "B", label: "Grupo B" },
      ],
    },
    {
      id: 8,
      label: "Identificação Contra Vale",
      property: "stringValue",
      options: [
        { value: "D", label: "Débito" },
        { value: "C", label: "Crédito" },
      ],
    },
    {
      id: 9,
      label: "Identificação Convênio",
      property: "stringValue",
      options: [
        { value: "C", label: "Convênio" },
      ],
    },
    {
      id: 10,
      label: "Imprimir Comprovante Tef Off",
      property: "stringValue",
      options: [
        { value: "N", label: "Não" },
        { value: "S", label: "Sim" },
      ],
    },
    {
      id: 11,
      label: "Liberação Supervisor",
      property: "stringValue",
      options: [
        { value: "N", label: "Não" },
        { value: "S", label: "Sim" },
      ],
    },
    {
      id: 12,
      label: "Liberar Saldo",
      property: "stringValue",
      options: [
        { value: "N", label: "Não" },
        { value: "S", label: "Sim" },
      ],
    },
    {
      id: 13,
      label: "Liberar Impedido",
      property: "stringValue",
      options: [
        { value: "N", label: "Não" },
        { value: "S", label: "Sim" },
      ],
    },
    {
      id: 14,
      label: "Liberação Supervisor Troco",
      property: "stringValue",
      options: [
        { value: "N", label: "Não" },
        { value: "S", label: "Sim" },
      ],
    },
    {
      id: 15,
      label: "Meio Pgto Troco",
      property: "stringValue",
      options: [
        { value: "01", label: "Troco 1" },
        { value: "02", label: "Troco 2" },
      ],
    },
    {
      id: 16,
      label: "Operações Permitidas",
      property: "stringValue",
      options: [
        { value: "T", label: "Todas" },
      ],
    },
    {
      id: 17,
      label: "Percentual de Desconto",
      property: "doubleValue",
      options: [
        { value: "0", label: "0%" },
        { value: "5", label: "5%" },
        { value: "10", label: "10%" },
      ],
    },
    {
      id: 18,
      label: "Percentual de Acréscimo",
      property: "doubleValue",
      options: [
        { value: "0", label: "0%" },
        { value: "5", label: "5%" },
        { value: "10", label: "10%" },
      ],
    },
    {
      id: 19,
      label: "Troco Máximo",
      property: "doubleValue",
      options: [
        { value: "50", label: "R$50" },
        { value: "100", label: "R$100" },
      ],
    },
  ];
