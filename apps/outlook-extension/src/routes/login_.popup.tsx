import { Button } from "@galleo/ui/components/base/button";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect } from "react";
import { aiServer, getSession } from "~/lib/ai-server";

export const Route = createFileRoute("/login_/popup")({
  validateSearch: (
    param,
  ): {
    type: "start" | "continue" | "error";
    error: string | null;
    errorDescription: string | null;
  } => {
    if (param.type === "start" || param.type === "continue") {
      return {
        type: param.type,
        error: null,
        errorDescription: null,
      };
    }

    if (param.type === "error") {
      const error = typeof param.error === "string" ? param.error : null;
      const errorDescription =
        typeof param.error_description === "string"
          ? decodeURIComponent(param.error_description)
          : null;
      return {
        type: "error",
        error,
        errorDescription,
      };
    }

    return { type: "start", error: null, errorDescription: null };
  },
  component: LoginPopup,
});

function LoginPopup() {
  const { type, errorDescription } = Route.useSearch();

  useEffect(() => {
    const handleStartLogin = () => {
      const redirectUrl = new URL(
        window.location.pathname,
        window.location.origin,
      );
      redirectUrl.searchParams.set("type", "continue");

      const errorUrl = new URL(redirectUrl);
      errorUrl.searchParams.set("type", "error");

      const result = aiServer.auth.microsoft?.$url({
        query: {
          successUrl: redirectUrl.href,
          errorUrl: errorUrl.href,
        },
      });
      if (result) {
        window.location.href = result.href;
        return;
      }

      Office.context.ui.messageParent(
        JSON.stringify({
          success: false,
          error: "Failed to get login url",
          message: "Login initialization failed",
        }),
        {
          targetOrigin: window.location.origin,
        },
      );
    };

    const handleContinueLogin = async () => {
      const session = await getSession();
      if (!session) {
        return redirect({
          to: "/login/popup",
          search: {
            type: "error",
            error: "invalid_session",
            errorDescription: "Invalid or expired session.",
          },
        });
      }

      return Office.context.ui.messageParent(
        JSON.stringify({
          success: true,
          message: "Login successful",
        }),
        {
          targetOrigin: window.location.origin,
        },
      );
    };

    if (type === "start") {
      return void handleStartLogin();
    }

    if (type === "continue") {
      return void handleContinueLogin();
    }
  }, [type]);

  let body = <p className="text-2xl">Logging you in...</p>;
  if (type === "error") {
    body = (
      <div className="space-y-2">
        <p className="text-2xl">Login failed.</p>
        {errorDescription && (
          <p className="max-w-md overflow-x-auto text-muted-foreground text-sm">
            {errorDescription}
          </p>
        )}
        <Button
          type="button"
          onClick={() =>
            redirect({
              to: "/login/popup",
              search: {
                type: "start",
                error: null,
                errorDescription: null,
              },
            })
          }
        >
          Try again
        </Button>
      </div>
    );
  }
  if (type === "continue") {
    body = (
      <div className="space-y-2">
        <p className="text-2xl">Finishing up login...</p>
        <p className="text-muted-foreground text-sm">
          This window will automatically close once the login is complete.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {body}
    </div>
  );
}
