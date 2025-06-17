// useSaveChatbotConfig.ts

import { useMutation, UseMutationResult } from "react-query";
import { saveChatbotConfig } from "../services/chatBotService";

interface ConfigChatbotPayload {
  whatsappNumber: string;
}

export function useSaveChatbotConfig(): UseMutationResult<
  any, // tipo do retorno da API
  Error, // tipo do erro
  ConfigChatbotPayload // tipo do dado enviado
> {
  return useMutation({
    mutationFn: (data: ConfigChatbotPayload) => saveChatbotConfig(data),
  });
}
