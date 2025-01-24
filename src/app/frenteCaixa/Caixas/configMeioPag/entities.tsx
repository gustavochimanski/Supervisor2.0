type ConfigOption = {
  value: string;
  label: string;
};

type Configuracao = {
  id: number;
  label: string;
  property: "stringValue" | "integerValue" | "doubleValue";
  options: ConfigOption[];
  allowCustomValue?: boolean; // Permite valores personalizados
};

// Constantes reutilizáveis para opções
const simNaoOptions: ConfigOption[] = [
  { value: "N", label: "Não" },
  { value: "S", label: "Sim" },
];

const percentualOptions: ConfigOption[] = [
  { value: "0", label: "0%" },
  { value: "5", label: "5%" },
  { value: "10", label: "10%" },
];

const trocoOptions: ConfigOption[] = [
  { value: "50", label: "R$50" },
  { value: "100", label: "R$100" },
];

// Configurações manuais com suporte a valores personalizados
export const configMap: Configuracao[] = [
  {
    id: 1,
    label: "Aciona Gaveta",
    property: "stringValue",
    options: simNaoOptions,
    allowCustomValue: true,
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
    allowCustomValue: true,
  },
  {
    id: 3,
    label: "Cartão Digitado",
    property: "stringValue",
    options: simNaoOptions,
    allowCustomValue: true,
  },
  {
    id: 4,
    label: "Desconto Ticket",
    property: "doubleValue",
    options: percentualOptions,
    allowCustomValue: true,
  },
  {
    id: 5,
    label: "Emite Contra Vale",
    property: "stringValue",
    options: simNaoOptions,
    allowCustomValue: true,
  },
  {
    id: 6,
    label: "Efetuar Sangria",
    property: "stringValue",
    options: simNaoOptions,
    allowCustomValue: true,
  },
  {
    id: 7,
    label: "Grupo Meio Pgto",
    property: "stringValue",
    options: [
      { value: "A", label: "Grupo A" },
      { value: "B", label: "Grupo B" },
    ],
    allowCustomValue: true,
  },
  {
    id: 8,
    label: "Identificação Contra Vale",
    property: "stringValue",
    options: [
      { value: "D", label: "Débito" },
      { value: "C", label: "Crédito" },
    ],
    allowCustomValue: true,
  },
  {
    id: 9,
    label: "Identificação Convênio",
    property: "stringValue",
    options: [
      { value: "C", label: "Convênio" },
    ],
    allowCustomValue: true,
  },
  {
    id: 10,
    label: "Imprimir Comprovante Tef Off",
    property: "stringValue",
    options: simNaoOptions,
    allowCustomValue: true,
  },
  {
    id: 11,
    label: "Liberação Supervisor",
    property: "stringValue",
    options: simNaoOptions,
    allowCustomValue: true,
  },
  {
    id: 12,
    label: "Liberar Saldo",
    property: "stringValue",
    options: simNaoOptions,
    allowCustomValue: true,
  },
  {
    id: 13,
    label: "Liberar Impedido",
    property: "stringValue",
    options: simNaoOptions,
    allowCustomValue: true,
  },
  {
    id: 14,
    label: "Liberação Supervisor Troco",
    property: "stringValue",
    options: simNaoOptions,
    allowCustomValue: true,
  },
  {
    id: 15,
    label: "Meio Pgto Troco",
    property: "stringValue",
    options: [
      { value: "01", label: "Troco 1" },
      { value: "02", label: "Troco 2" },
    ],
    allowCustomValue: true,
  },
  {
    id: 16,
    label: "Operações Permitidas",
    property: "stringValue",
    options: [
      { value: "T", label: "Todas" },
    ],
    allowCustomValue: true,
  },
  {
    id: 17,
    label: "Percentual de Desconto",
    property: "doubleValue",
    options: percentualOptions,
    allowCustomValue: true,
  },
  {
    id: 18,
    label: "Percentual de Acréscimo",
    property: "doubleValue",
    options: percentualOptions,
    allowCustomValue: true,
  },
  {
    id: 19,
    label: "Troco Máximo",
    property: "doubleValue",
    options: trocoOptions,
    allowCustomValue: true,
  },
];
