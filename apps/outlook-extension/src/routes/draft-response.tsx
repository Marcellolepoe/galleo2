import { Button } from "@galleo/ui/components/base/button";
import { Input } from "@galleo/ui/components/base/input";
import { Icons } from "@galleo/ui/icon";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import { ChatMessageWidget } from "~/components/chat";
import { getSession } from "~/lib/ai-server";

export const Route = createFileRoute("/draft-response")({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) {
      throw redirect({
        to: "/login",
      });
    }
    return { session };
  },
  component: DraftResponse,
});

function DraftResponse() {
  const { session } = Route.useRouteContext();
  const {
    input,
    handleInputChange,
    handleSubmit,
    messages,
    isLoading,
    error,
    reload,
    stop,
    data,
    append,
  } = useChat({
    api: "http://localhost:6922/api/chat",
    credentials: "include",
    onResponse: (response) => {
      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }
    },
    onError: (error) => {
      console.error("Chat error:", error);
    },
  });
  // TODO: clean this up
  const isReady = useRef(false);

  console.log("data", data);
  console.log("messages", messages);

  // biome-ignore lint/correctness/useExhaustiveDependencies: only run once
  useEffect(() => {
    if (isReady.current) return;
    isReady.current = true;
    Office.onReady(async () => {
      const { item } = Office.context.mailbox;
      console.log("item", item);
      if (!item) return;
      try {
        const subject = item.subject;
        const sender = item.sender.emailAddress;
        const body = await new Promise<string>((resolve, reject) => {
          item.body.getAsync(Office.CoercionType.Text, (result) => {
            if (result.status === Office.AsyncResultStatus.Succeeded) {
              return resolve(result.value);
            }
            reject(result.error);
          });
        });

        // Add initial message with context
        append(
          {
            role: "user",
            content: body,
          },
          {
            body: {
              context: {
                emailSubject: subject,
                emailBody: body,
                senderEmail: sender,
              },
            },
          },
        );
      } catch (error) {
        console.error("Error loading email details:", error);
      }
    });
  }, []);

  const handleGenerateResponse = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await handleSubmit(event);
    } catch (error) {
      console.error("Error generating response:", error);
    }
  };

  if (!messages.length) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Icons.spinner className="h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4 p-3">
          <h1 className="text-xl">Galleo</h1>

          <div className="space-y-3">
            {messages.map((message) => (
              <ChatMessageWidget
                key={message.content}
                message={message}
                error={!!error}
                isLoading={isLoading}
                onRegenerate={reload}
                session={session}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="border-t bg-background p-3">
        <form onSubmit={handleGenerateResponse}>
          <div className="flex flex-col space-y-3">
            <Input
              name="follow-up-question"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask a follow-up question..."
              disabled={isLoading}
            />
            {isLoading ? (
              <Button
                type="button"
                variant="secondary"
                className="w-full"
                disabled={!isLoading}
                onClick={stop}
              >
                <Icons.stop
                  className="h-4 w-4 fill-foreground"
                  aria-hidden="true"
                />
                Cancel Generation
              </Button>
            ) : (
              <Button
                type="submit"
                isLoading={isLoading}
                disabled={!input.trim() || !!error}
              >
                {isLoading ? "Generating..." : "Send"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
