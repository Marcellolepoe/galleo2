import { Button } from "@galleo/ui/components/button";
import { toast } from "@galleo/ui/components/sonner";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Open the login popup
    Office.context.ui.displayDialogAsync(
      `${window.location.origin}/login/popup`,
      { height: 60, width: 30, displayInIframe: false },
      (result) => {
        if (result.status === Office.AsyncResultStatus.Failed) {
          if (result.error.message.includes("user chose")) {
            return toast.info(
              "Pop-up blocked. Please allow pop up to continue.",
            );
          }
          if (result.error.message.includes("already has an active dialog")) {
            return toast.info(
              "There is already an active login session. Please login through that.",
            );
          }
          return toast.error(
            `An error occurred while trying to login. ${result.error.message}`,
          );
        }

        const dialog = result.value;
        dialog.addEventHandler(
          Office.EventType.DialogMessageReceived,
          (arg) => {
            dialog.close();
            // Check if the message property exists and matches our expected value
            if ("message" in arg) {
              const result:
                | { success: false; error: string; message: string }
                | { success: true; message: string } = JSON.parse(arg.message);

              if (result.success) {
                return navigate({ to: "/taskpane" });
              }

              return toast.error(`${result.message}: ${result.error}`);
            }

            return toast.error(
              "Something unexpected happened while logging in. Please try again or contact support.",
            );
          },
        );
        return;
      },
    );
  };

  return (
    <div className="flex grow flex-col items-center justify-center p-4">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="font-bold text-2xl">Welcome to Galleo</h1>
        <p className="text-muted-foreground">
          You are currently not logged in. To access all features and get
          started, please click the login button below.
        </p>
        <Button type="button" onClick={handleLogin}>
          Login to Get Started
        </Button>
      </div>
    </div>
  );
}
