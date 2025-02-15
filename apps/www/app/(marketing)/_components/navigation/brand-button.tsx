import { cn } from "@galleo/ui/utils/cn";
import Link from "next/link";
import { ROUTE_HOME } from "~/lib/routes";
import { siteConfig } from "~/lib/site-config";

export function BrandButton({ className }: { className?: string }) {
  return (
    <Link
      href={ROUTE_HOME}
      title={siteConfig.name}
      className={cn("flex items-center space-x-3", className)}
    >
      <img 
        src="/galleo-icon.svg" 
        alt="Galleo Logo" 
        className="h-[50px] w-[150px] md:h-[60px] md:w-[180px]" 
      />
    </Link>
  );
}
