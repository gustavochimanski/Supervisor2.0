export interface TableHeader {
    key: string; // Identificador único
    label: string; // Texto do cabeçalho
    sortable?: boolean; // Define se a coluna pode ser ordenada
  }