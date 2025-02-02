import { cn } from "../utils/cn";

export function Spacer({ className }: { className?: string }) {
  return <div className={cn("h-12", className)} />;
}
