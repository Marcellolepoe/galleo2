// app/router.tsx
import {
  RouterProvider,
  createMemoryHistory,
  createRouter as createTanStackRouter,
} from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";

export function createRouter() {
  const memoryHistory = createMemoryHistory({
    initialEntries: [window.location.pathname],
  });

  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    history: memoryHistory,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}

Office.onReady((info) => {
  console.log("info.host", info.host);
  if (info.host !== Office.HostType.Outlook) {
    return;
  }
  const router = createRouter();

  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }
  if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>,
    );
  }
}).catch((error) => {
  console.error("Error initializing Office:", error);
});
