import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/commands")({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    /**
     * Shows a notification when the add-in command is executed.
     * @param event
     */
    function action(event: Office.AddinCommands.Event) {
      const message: Office.NotificationMessageDetails = {
        type: Office.MailboxEnums.ItemNotificationMessageType
          .InformationalMessage,
        message: "Performing the action...",
        icon: "Icon.80x80",
        persistent: true,
      };

      console.log("message", message);

      // Show a notification message.
      Office.context.mailbox.item?.notificationMessages.replaceAsync(
        "ActionPerformanceNotification",
        message,
      );

      // Be sure to indicate when the add-in command function is complete.
      event.completed();
    }

    Office.onReady(() => {
      // Register the function with Office.
      Office.actions.associate("action", action);

      Office.actions.associate("ShowTaskpane", () => {
        return Office.addin
          .showAsTaskpane()
          .then(() => {
            return;
          })
          .catch((error) => {
            return error.code;
          });
      });
    });
  }, []);
  return null;
}
