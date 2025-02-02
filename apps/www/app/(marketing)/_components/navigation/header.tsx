"use client";

import { cn } from "@galleo/ui/utils/cn";
import { useEffect, useState } from "react";
import { BrandButton } from "./brand-button";
import { SiteDrawer } from "./site-drawer";
import { SiteMenu } from "./site-menu";

export function Header() {
  const [addBorder, setAddBorder] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setAddBorder(true);
      } else {
        setAddBorder(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className="sticky top-0 z-50 bg-background/60 py-4 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-3 md:px-4">
        <BrandButton />

        <div className="hidden lg:block">
          <SiteMenu />
        </div>
        <div className="block lg:hidden">
          <SiteDrawer />
        </div>
      </div>
      <hr
        className={cn(
          "absolute bottom-0 w-full transition-opacity duration-300 ease-in-out",
          addBorder ? "opacity-100" : "opacity-0",
        )}
      />
    </header>
  );
}
