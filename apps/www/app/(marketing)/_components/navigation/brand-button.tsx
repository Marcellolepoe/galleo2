import { cn } from "@galleo/ui/utils/cn";
import Link from "next/link";
import { ROUTE_HOME } from "~/lib/routes";
import { siteConfig } from "~/lib/site-config";

export function BrandButton({ className }: { className?: string }) {
  return (
    <Link
      href={ROUTE_HOME}
      title={siteConfig.name}
      className={cn("flex items-center space-x-2", className)}
    >
      <siteConfig.icon className="size-[30px]" />
      <span className="font-serif text-xl tracking-tight">
        {siteConfig.name}
      </span>
    </Link>
  );
}
