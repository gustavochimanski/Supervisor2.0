// utils.ts (ou no mesmo arquivo)
export const parseDouble = (value: string): number => {
    // Substitui vírgula por ponto
    const normalized = value.replace(',', '.');
    const parsed = parseFloat(normalized);
    return isNaN(parsed) ? 0 : parsed;
  };
  