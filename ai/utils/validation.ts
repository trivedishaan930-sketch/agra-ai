import type {
  GenerateTextRequest,
  TokenCountRequest,
} from "@/ai/types/provider";
import { ProviderType } from "@/ai/types/provider";
import { ValidationError } from "@/ai/errors/provider-errors";

export function assertPromptOrMessages(
  request: GenerateTextRequest,
  provider: ProviderType,
) {
  const hasPrompt = Boolean(request.prompt?.trim());
  const hasMessages = Boolean(request.messages?.length);
  if (!hasPrompt && !hasMessages) {
    throw new ValidationError(
      "AI requests require either a prompt or at least one message.",
      provider,
    );
  }
}

export function assertTokenCountInput(
  request: TokenCountRequest,
  provider: ProviderType,
) {
  const hasText = Boolean(request.text?.trim());
  const hasMessages = Boolean(request.messages?.length);
  if (!hasText && !hasMessages) {
    throw new ValidationError(
      "Token counting requires text or messages.",
      provider,
    );
  }
}
