import * as React from "react";
import { cn } from "@/lib/utils";

interface IntegerInputProps
  extends Omit<React.ComponentProps<"input">, "value" | "onChange"> {
  value: number;
  onChange: (value: string) => void;
}

const InputLefZero = React.forwardRef<HTMLInputElement, IntegerInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    // Converte o valor numérico para string com 3 dígitos (ex.: 5 -> "005")
    const formattedValue = String(value).padStart(3, "0");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value;
      // Remove quaisquer caracteres que não sejam dígitos
      inputValue = inputValue.replace(/\D/g, "");
      // Garante que o valor tenha pelo menos 3 dígitos, preenchendo com zeros à esquerda
      const formattedInput = inputValue.padStart(3, "0");
      // Chama o onChange com o valor formatado (como string)
      onChange(formattedInput);
    };

    return (
      <input
        type="text" // Usamos "text" para que os zeros à esquerda sejam exibidos
        value={formattedValue}
        onChange={handleChange}
        className={cn(
          "flex h-6 w-full rounded-2xl border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

export default InputLefZero


