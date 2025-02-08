import { Button } from "@galleo/ui/components/base/button";
import { Icons } from "@galleo/ui/icon";
import { cn } from "~/lib/utils";

interface AssistantMessageProps {
  message: string;
  timestamp?: Date;
  onFeedback?: (isPositive: boolean) => void;
  feedback?: "positive" | "negative";
  isLoading?: boolean;
  error?: boolean;
  onRegenerate?: () => void;
  className?: string;
}

export function AssistantMessageWidget({
  message,
  timestamp,
  onFeedback,
  feedback,
  isLoading,
  error,
  onRegenerate,
  className,
}: AssistantMessageProps) {
  return (
    <div
      className={cn(
        "group relative rounded-lg border bg-primary/5 p-4 transition-all",
        error && "border-destructive",
        feedback === "positive" && "border-success",
        feedback === "negative" && "border-destructive",
        className,
      )}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <Icons.bot className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-primary text-xs">Galleo</span>
            {timestamp && (
              <span className="text-muted-foreground text-xs">
                {new Date(timestamp).toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
        <div className="flex-1">
          {error ? (
            <div className="space-y-2">
              <p className="text-destructive text-sm">
                Failed to generate response
              </p>
              {onRegenerate && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRegenerate}
                  className="h-8"
                >
                  <Icons.refresh className="mr-2 h-4 w-4" />
                  Retry
                </Button>
              )}
            </div>
          ) : (
            <div className="relative">
              <p
                className="text-sm leading-relaxed"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: we control the input
                dangerouslySetInnerHTML={{ __html: message }}
              />
            </div>
          )}
        </div>
        {!isLoading && !error && onFeedback && (
          <div className="absolute top-4 right-4 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 w-8 p-0",
                feedback === "positive" && "text-success",
              )}
              onClick={() => onFeedback(true)}
            >
              <Icons.thumbsUp className="h-4 w-4" />
              <span className="sr-only">Mark as helpful</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 w-8 p-0",
                feedback === "negative" && "text-destructive",
              )}
              onClick={() => onFeedback(false)}
            >
              <Icons.thumbsDown className="h-4 w-4" />
              <span className="sr-only">Mark as not helpful</span>
            </Button>
          </div>
        )}
      </div>
      <div className="mt-2">
        {!error && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              try {
                const { item } = Office.context.mailbox;
                if (!item) return;

                item.displayReplyAllForm({
                  htmlBody: message,
                });
              } catch (error) {
                console.error("Error setting draft:", error);
              }
            }}
          >
            <Icons.edit className="mr-2 h-4 w-4" />
            Create Draft
          </Button>
        )}
      </div>
    </div>
  );
}
