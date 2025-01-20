import styles from "./searchBar.module.css";
import Button from "../Button/Button";
import React, { InputHTMLAttributes, useState } from "react";
import Input from "../Input/Input";
import { FaSpinner, FaSearch } from "react-icons/fa";

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch: (query: string) => Promise<void>; // Função para executar a busca
  placeholder?: string; // Texto do placeholder
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Digite algo...", onError }) => {
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const [error, setError] = useState(""); // Mensagem de erro
  const [query, setQuery] = useState(""); // Estado do valor do input

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!query.trim()) {
      const errorMsg = "Por favor, preencha o campo de busca.";
      setError(errorMsg);
      return;
    }

    setIsLoading(true);

    try {
      await onSearch(query);
      setQuery("");
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Erro ao realizar busca.";
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (value: string) => {
    setQuery(value);
    setError("");
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      {/* Campo de Entrada */}
      <Input
        id="input-pesquisa"
        type="text"
        label="Pesquisar"
        placeholder={placeholder}
        value={query}
        onValueChange={handleChange}
        className={styles.customInput}
        maxLength={50} 
      />

      {/* Botão de Envio */}
      <Button
        id="button-pesquisar"
        icon={isLoading ? <FaSpinner className="icon spinner" /> : <FaSearch className="icon" />}
        type="submit"
        isLoading={isLoading}
        className={styles.customButton}
      />
    </form>
  );
};

export default SearchBar;
