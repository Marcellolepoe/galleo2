import { Button } from "@galleo/ui/components/base/button";
import { Textarea } from "@galleo/ui/components/base/textarea";
import { Icons } from "@galleo/ui/icon";
import { useState } from "react";
import type { UserSession } from "~/lib/ai-server";
import { cn } from "~/lib/utils";

function getInitials(name: string | null): string {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

interface MessageProps {
  message: string;
  timestamp?: Date;
  isEditing?: boolean;
  onEdit?: (newMessage: string) => void;
  onDelete?: () => void;
  className?: string;
  session: UserSession;
}

export function UserMessageWidget({
  message,
  timestamp,
  isEditing,
  onEdit,
  onDelete,
  className,
  session,
}: MessageProps) {
  const [isEditable, setIsEditable] = useState(isEditing);
  const [editedMessage, setEditedMessage] = useState(message);
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 240;
  const shouldTruncate = message.length > maxLength;
  const displayText = isExpanded ? message : message.slice(0, maxLength);

  const handleSave = () => {
    onEdit?.(editedMessage);
    setIsEditable(false);
  };

  return (
    <div
      className={cn(
        "group relative rounded-lg border border-border bg-background p-4 transition-all hover:shadow-sm",
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-3">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
            {session.image ? (
              <img
                src={session.image}
                alt={session.name ?? "User"}
                className="h-full w-full rounded-full"
              />
            ) : (
              <span className="font-medium text-primary text-xs">
                {getInitials(session.name)}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-primary text-xs">
              {session.name}
            </span>
            {timestamp && (
              <span className="block text-muted-foreground text-xs">
                {new Date(timestamp).toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          {isEditable ? (
            <div className="space-y-2">
              <Textarea
                value={editedMessage}
                onChange={(e) => setEditedMessage(e.target.value)}
                className="min-h-96 w-full resize-none"
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditable(false)}
                >
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative space-y-1">
              <p className="max-w-full whitespace-pre-wrap break-words text-sm leading-relaxed">
                {displayText}
                {shouldTruncate && !isExpanded && "..."}
              </p>
              {shouldTruncate && (
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="font-medium text-primary text-xs hover:text-primary/90"
                >
                  {isExpanded ? "Show less" : "Show more"}
                </button>
              )}
            </div>
          )}
        </div>
        {!isEditable && (
          <div className="absolute top-4 right-4 flex opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setIsEditable(true)}
            >
              <Icons.edit className="h-4 w-4" />
              <span className="sr-only">Edit message</span>
            </Button>
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-destructive"
                onClick={onDelete}
              >
                <Icons.trash className="h-4 w-4" />
                <span className="sr-only">Delete message</span>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
