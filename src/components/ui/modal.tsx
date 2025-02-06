
interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  style?: React.CSSProperties;
}

import React from "react";

export function Modal({ children, onClose, style }: ModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 overflow-hidden"
      onClick={onClose}
    >
      <div
        style={style} 
        className="flex flex-col bg-white rounded shadow-lg max-w-[90vw] max-h-[90vh] w-full h-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar dentro
      >
        {children}
      </div>
    </div>
  );
}
