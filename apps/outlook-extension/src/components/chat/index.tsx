import type { Message } from "ai";
import type { UserSession } from "~/lib/ai-server";
import { AssistantMessageWidget } from "./assistant";
import { UserMessageWidget } from "./user";

export function ChatMessageWidget({
  message,
  onEdit,
  onDelete,
  onFeedback,
  isLoading,
  error,
  onRegenerate,
  session,
}: {
  message: Message;
  onEdit?: (newMessage: string) => void;
  onDelete?: () => void;
  onFeedback?: (isPositive: boolean) => void;
  isLoading?: boolean;
  error?: boolean;
  onRegenerate?: () => void;
  session: UserSession;
}) {
  if (message.role === "assistant") {
    const lastPart = message.parts?.at(-1);
    if (lastPart?.type === "text") {
      return (
        <AssistantMessageWidget
          message={lastPart.text}
          timestamp={message.createdAt}
          onFeedback={onFeedback}
          isLoading={isLoading}
          error={error}
          onRegenerate={onRegenerate}
        />
      );
    }
    return <div>No text part</div>;
  }

  return (
    <UserMessageWidget
      message={message.content}
      timestamp={message.createdAt}
      onEdit={onEdit}
      onDelete={onDelete}
      session={session}
    />
  );
}
