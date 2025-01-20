import React, { ButtonHTMLAttributes } from "react";
import styles from "./button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode; // Ícone ou conteúdo do botão
  isLoading?: boolean; // Indica se o botão está em estado de carregamento
}

const ButtonSecondary: React.FC<ButtonProps> = ({
  icon,
  isLoading = false,
  className,
  children,
  ...rest
}) => {
  return (
    <button
      disabled={isLoading} // Botão desativado se estiver carregando
      className={`${styles.buttonGeral} ${className || ""}`} // Combina estilos padrão e personalizados
      {...rest} // Passa atributos adicionais como `aria-*`, `onClick`, etc.
    >
      {isLoading ? (
        <span className={styles.loader}></span> // Indicador de carregamento
      ) : (
        <>
          {icon && <span className={styles.icon}>{icon}</span>} {/* Ícone opcional */}
          {children} {/* Conteúdo do botão (texto ou outros elementos) */}
        </>
      )}
    </button>
  );
};

export default ButtonSecondary;
