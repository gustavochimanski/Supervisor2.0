import React, { InputHTMLAttributes } from "react";
import styles from "./input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string; // ID do input (obrigatório)
  label?: string; // Rótulo do input (opcional)
  onValueChange: (value: any) => void; // Callback para alteração de valor
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  value = "", // Valor padrão para evitar undefined
  onValueChange,
  className,
  ...rest
}) => {
  // Função para lidar com alterações no valor do input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue =
      type === "number" && event.target.value !== ""
        ? Number(event.target.value)
        : event.target.value;
    onValueChange(inputValue);
  };

  return (
    <div className={styles.inputWrapper}>
      {/* Rótulo (opcional) */}
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      {/* Campo de Entrada */}
      <input
        id={id}
        type={type}
        placeholder={placeholder || ""}
        value={value}
        className={`${styles.input} ${className || ""}`}
        onChange={handleChange}
        {...rest} // Permite passar atributos adicionais nativos do input
      />
    </div>
  );
};

export default Input;
