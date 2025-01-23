"use client";

import React from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export function Modal({ children, onClose }: ModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // Fecha o modal ao clicar fora da caixa
    >
      <div
        className="bg-white p-6 rounded shadow-lg max-w-[60vw] max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar dentro da caixa
      >
        {children}
      </div>
    </div>
  );
}
