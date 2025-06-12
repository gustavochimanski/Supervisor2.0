// chatbotService.ts

import apiMensuraBot from "@/app/api/apiMensuraBot";

interface ConfigChatbotPayload {
  whatsappNumber: string;
}

export async function saveChatbotConfig(data: ConfigChatbotPayload) {
  try {
    const response = await apiMensuraBot.post("/config-chatbot", data);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || "Erro ao salvar configurações.";
    throw new Error(message);
  }
}
