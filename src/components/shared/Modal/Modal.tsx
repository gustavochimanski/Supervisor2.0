import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import Input from "../../shared/UI/Input/Input";
import Button from "../../shared/UI/Button/Button";

interface ModalContent {
  key: string;
  value: any;
}

interface ModalProps {
  isOpen: boolean; // Define se o modal está visível
  onClose: () => void; // Função para fechar o modal
  title?: string; // Título do modal
  content?: ModalContent[]; // Lista de pares chave/valor para exibir no modal
  onSave?: (updatedContent: ModalContent[]) => void; // Função chamada ao salvar
  buttons?: React.ReactNode[]; // Lista de botões personalizados
  className?: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content, onSave, buttons }) => {
  const [editableContent, setEditableContent] = useState<ModalContent[]>(content || []);

  // Atualiza o estado local quando o conteúdo muda
  useEffect(() => {
    if (content) {
      setEditableContent(content);
      console.log(content)
    }
  }, [content]);

  // Manipula alterações nos valores do conteúdo
  const handleValueChange = (key: string, value: any) => {
    setEditableContent((prevContent) =>
      prevContent.map((item) =>
        item.key === key ? { ...item, value } : item
      )
    );
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className={styles.header}>
          {title && <h2>{title}</h2>}
        </div>
  

        {/* BODY */}
        <div className={styles.body}>
          {editableContent.length > 0 ? (
            editableContent.map((item, index) => (
              <div key={index} className={styles.inputGroup}>
                <label htmlFor={item.key}>
                  <strong>{item.key}:</strong>
                </label>
                <Input
                  id={item.key}
                  value={item.value}
                  onValueChange={(newValue) => handleValueChange(item.key, newValue)}
                />
              </div>
            ))
          ) : (
            <p>Nenhum conteúdo disponível.</p>
          )}
        </div>

        {/* FOOTER */}
        <div className={styles.footer}>
          {buttons &&
            buttons.map((button, index) => (
              <React.Fragment key={index}>{button}</React.Fragment>
            ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
