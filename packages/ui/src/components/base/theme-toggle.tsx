import { Icons } from "../../icon";
import { useTheme } from "../../theme-provider";
import { cn } from "../../utils/cn";
import { Button } from "./button";

export function ThemeToggle({
  className,
}: {
  className?: string;
}) {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
      className={cn("relative", className)}
    >
      <Icons.sun className="dark:-rotate-90 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0" />
      <Icons.moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
