import React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { cn } from "@/lib/utils";

// Extendendo as props para incluir o "format"
interface CustomNumericFormatProps extends NumericFormatProps {
  format?: (inputValue: string) => string;
}

interface InputLeftZeroProps
  extends Omit<
    CustomNumericFormatProps,
    "onValueChange" | "onChange" | "customInput"
  > {
  value: number | string | undefined;
  onChange: (value: string) => void;
  className?: string;
}

// Componente wrapper para o input
const CustomInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => <input ref={ref} {...props} />);

const InputLeftZero: React.FC<InputLeftZeroProps> = ({
  value,
  onChange,
  className,
  ...props
}) => {
  // Se value for undefined ou null, converte para string vazia
  const stringValue =
    value !== undefined && value !== null
      ? typeof value === "string"
        ? value
        : value.toString()
      : "";

  // Função de formatação: garante 3 dígitos preenchendo com zeros à esquerda
  const formatValue = (inputValue: string) => {
    const numericValue = inputValue.replace(/\D/g, "").slice(0, 3);
    return numericValue.padStart(3, "0");
  };

  return (
    <NumericFormat
      value={stringValue}
      // Aplica a formatação a cada renderização
      format={formatValue}
      onValueChange={(values) => {
        onChange(values.formattedValue);
      }}
      // Ao perder o foco, força a formatação e atualiza o valor
      onBlur={(e) => {
        const formatted = formatValue(e.target.value);
        onChange(formatted);
        // Se houver um onBlur passado em props, o chama também
        if (props.onBlur) {
          props.onBlur(e);
        }
      }}
      customInput={CustomInput}
      className={cn(
        "flex h-6 w-full rounded-2xl border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
      maxLength={3}
    />
  );
};

InputLeftZero.displayName = "InputLeftZero";

export default InputLeftZero;
