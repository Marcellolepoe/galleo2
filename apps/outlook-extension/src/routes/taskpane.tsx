import { Button } from "@galleo/ui/components/button";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";

interface EmailDetails {
  subject: string;
  sender: string;
  body: string;
}

interface AsyncResult<T> {
  status: Office.AsyncResultStatus;
  value: T;
  error?: Error;
}

const getEmailSubject = (item: Office.MessageRead): string => {
  return item.subject;
};

const getEmailSender = (item: Office.MessageRead): Promise<string> => {
  return Promise.resolve(item.sender?.emailAddress || "Unknown Sender");
};

const getEmailBody = async (item: Office.MessageRead): Promise<string> => {
  return new Promise<string>((resolve) => {
    item.body.getAsync(
      Office.CoercionType.Text,
      (result: AsyncResult<string>) => {
        resolve(
          result.status === Office.AsyncResultStatus.Succeeded
            ? result.value || ""
            : "",
        );
      },
    );
  });
};

const loadEmailDetails = async (
  item: Office.MessageRead,
): Promise<EmailDetails> => {
  const [subject, sender, body] = await Promise.all([
    getEmailSubject(item),
    getEmailSender(item),
    getEmailBody(item),
  ]);

  return {
    subject,
    sender,
    body,
  };
};

export const Route = createFileRoute("/taskpane")({
  beforeLoad: () => {
    return redirect({
      to: "/login",
    });
  },
  component: TaskPane,
});

function MessageBody({ body }: { body: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 200;
  const shouldTruncate = body.length > maxLength;
  const displayText = isExpanded ? body : body.slice(0, maxLength);

  return (
    <div className="mt-2">
      <p className="font-medium text-slate-900 text-sm dark:text-white">
        Message:
      </p>
      <div className="mt-1">
        <p className="whitespace-pre-wrap text-slate-600 text-sm dark:text-slate-300">
          {displayText}
          {shouldTruncate && !isExpanded && "..."}
        </p>
        {shouldTruncate && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 font-medium text-blue-600 text-sm hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    </div>
  );
}

function TaskPane() {
  const [emailDetails, setEmailDetails] = useState<EmailDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Initialize Office and get email details
    Office.onReady(async () => {
      if (Office.context.mailbox) {
        const item = Office.context.mailbox.item;
        if (item) {
          try {
            const details = await loadEmailDetails(item);
            setEmailDetails(details);
          } catch (error) {
            console.error("Error loading email details:", error);
          } finally {
            setIsLoading(false);
          }
        }
      }
    });
  }, []);

  const generateResponse = async () => {
    if (!emailDetails) return;

    setIsGenerating(true);
    try {
      // const template = getRandomTemplate();
      // const randomWords = getRandomWords(3);
      // const response = template
      //   .replace("{subject}", emailDetails.subject)
      //   .replace("{random}", `We will ${randomWords} address this matter.`);

      // // Create a reply
      // await new Promise<void>((resolve, reject) => {
      //   try {
      //     if (Office.context.mailbox.item) {
      //       Office.context.mailbox.item.displayReplyAllForm(response);
      //     }
      //     resolve();
      //   } catch (error) {
      //     reject(error);
      //   }
      // });
      console.log("https://localhost:3099/taskpane");
      const url = new URL("/taskpane", window.location.origin);
      console.log("url", url);

      await document.requestStorageAccess();
      document.hasStorageAccess().then((hasAccess) => {
        console.log("hasAccess", hasAccess);
      });
      await Office.context.ui.displayDialogAsync(
        "https://localhost:3099/taskpane",
        {
          displayInIframe: true,
        },
        (result) => {
          console.log(result);
        },
      );
    } catch (error) {
      console.error("Error generating response:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-900">
        <div className="text-slate-900 dark:text-white">
          Loading email details...
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white p-4 dark:bg-slate-900">
      <div className="space-y-4">
        {emailDetails && (
          <>
            <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10">
              <h2 className="mb-2 font-medium text-lg text-slate-900 dark:text-white">
                Current Email
              </h2>
              <div className="space-y-2">
                <p className="text-slate-600 text-sm dark:text-slate-300">
                  <span className="font-medium text-slate-900 dark:text-white">
                    Most recent sender:{" "}
                  </span>
                  {emailDetails.sender}
                </p>
                <p className="text-slate-600 text-sm dark:text-slate-300">
                  <span className="font-medium text-slate-900 dark:text-white">
                    Subject:{" "}
                  </span>
                  {emailDetails.subject}
                </p>
                <MessageBody body={emailDetails.body} />
              </div>
            </div>

            <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10">
              <Button
                type="button"
                onClick={generateResponse}
                disabled={isGenerating}
                className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-slate-800"
              >
                {isGenerating ? "Generating..." : "Generate Response"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
