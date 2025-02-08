import { Toaster } from "@galleo/ui/components/base/sonner";
import { ThemeToggle } from "@galleo/ui/components/base/theme-toggle";
import { ThemeProvider } from "@galleo/ui/theme-provider";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="relative flex min-h-screen flex-col">
        <Outlet />
        <TanStackRouterDevtools />
        <ThemeToggle className="fixed top-2 right-2" />
      </div>
      <Toaster closeButton />
    </ThemeProvider>
  ),
});
