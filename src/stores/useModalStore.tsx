// stores/useModalStore.ts
import { create } from "zustand";

type ModalState = {
  isEnviarConfiguracaoModalOpen: boolean;
  isEnviarProdutosModalOpen: boolean;
  openEnviarConfig: () => void;
  closeEnviarConfig: () => void;
  openEnviarProdutos: () => void;
  closeEnviarProdutos: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isEnviarConfiguracaoModalOpen: false,
  isEnviarProdutosModalOpen: false,
  openEnviarConfig: () => set({ isEnviarConfiguracaoModalOpen: true }),
  closeEnviarConfig: () => set({ isEnviarConfiguracaoModalOpen: false }),
  openEnviarProdutos: () => set({ isEnviarProdutosModalOpen: true }),
  closeEnviarProdutos: () => set({ isEnviarProdutosModalOpen: false }),
}));
