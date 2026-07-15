import type { AIMessage, TokenCountRequest } from "@/ai/types/provider";

const APPROXIMATE_CHARACTERS_PER_TOKEN = 4;

function messageToText(message: AIMessage) {
  return `${message.role}: ${message.content}`;
}

export function normalizeTokenCountInput(request: TokenCountRequest) {
  if (request.text) return request.text;
  return request.messages?.map(messageToText).join("\n") ?? "";
}

export function estimateTokenCount(request: TokenCountRequest) {
  const input = normalizeTokenCountInput(request).trim();
  if (!input) return 0;
  return Math.ceil(input.length / APPROXIMATE_CHARACTERS_PER_TOKEN);
}
