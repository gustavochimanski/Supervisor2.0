import React from "react";
import styles from "./styles.module.css";

export interface TableHeader {
  key: string; // Identificador único do cabeçalho (deve coincidir com as chaves dos dados)
  label: string; // Nome exibido no cabeçalho
  sortable?: boolean; // Indica se o cabeçalho é ordenável
}

export interface TableProps<T> {
  headers: TableHeader[]; // Configuração dos cabeçalhos
  data: T[]; // Dados da tabela
  onRowClick?: (item: T) => void; // Função chamada ao clicar em uma linha // Função opcional para renderizar cada linha
  emptyMessage?: string; // Mensagem exibida se os dados estiverem vazios
}

const Table = <T,>({
  headers,
  data,
  onRowClick,
  emptyMessage = "No data available",
}: TableProps<T>) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        {/*============== CABEÇALHO ==============*/}
        <thead className={styles.thead}>
          <tr>
            {headers.map((header) => (
              <th key={header.key}>{header.label}</th>
            ))}
          </tr>
        </thead>

        {/*============== CORPO ==============*/}
        <tbody className={styles.tbody}>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}
                className={onRowClick ? styles.clickableRow : undefined}
                onClick={() => onRowClick && onRowClick(item)}
              >
              {headers.map((header) => (
                    <td key={header.key}>{(item as any)[header.key]}</td>
                  ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className={styles.empty}>
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
