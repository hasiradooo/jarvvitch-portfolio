"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shell } from "./Shell";
import { useEffect, useState } from "react";
import { OutlineClose } from "../icons/assets/user_interface/Close";
import { OutlineMenu } from "../icons/assets/user_interface/Menu";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";


const links = [
  { href: "/", label: "About" },
  { href: "/gallery", label: "Gallery " },
  { href: "/contact", label: "Contact" },
  { href: "/tos", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/pricelist", label: "Price List" },
];


export function TopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Zamykaj menu po zmianie trasy
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="w-full">
      <Shell>
        {/* Mobile top bar with Sheet trigger */}
        <div className="lg:hidden flex items-center justify-end px-3 py-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls="mobile-nav"
                className="inline-flex items-center justify-center rounded-md p-2 text-foreground/80 hover:text-foreground hover:bg-foreground/10 transition"
              >
                {open ? <OutlineClose /> : <OutlineMenu />}
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="gap-0 p-0">
              {/* a11y title for screen readers */}
              <SheetTitle className="sr-only">Main navigation</SheetTitle>
              <nav
                id="mobile-nav"
                aria-label="Mobile nav"
                className="flex flex-col gap-1 px-3 py-4 font-medium tracking-[0.1em] text-foreground/90 [font-feature-settings:'ss01'] font-witchcraft uppercase text-base"
              >
                {links.map((l) => {
                  const isActive = pathname === l.href;
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={`p-2 rounded transition-colors ${isActive
                        ? 'bg-foreground/10 text-foreground'
                        : 'text-foreground/80 hover:text-foreground hover:bg-foreground/10'
                        }`}
                    >
                      {l.label}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop nav */}
        <nav
          aria-label="Główna nawigacja"
          className="hidden lg:flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 px-3 py-4 md:py-5 font-medium tracking-[0.12em] md:tracking-[0.18em] text-foreground/90 [font-feature-settings:'ss01'] font-witchcraft uppercase text-base sm:text-lg md:text-xl lg:text-2xl"
        >
          {links.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`
                  relative transition-all duration-300 ease-in-out
                  hover:text-foreground hover:scale-105
                  ${isActive
                    ? 'text-foreground scale-105'
                    : 'text-foreground/70 hover:text-foreground/90'
                  }
                `}
              >
                {l.label}
                {isActive && (
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-primary" />
                )}
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-accent/60 rounded-full scale-x-0 hover:scale-x-100 transition-transform duration-300 ease-in-out origin-center" />
              </Link>
            );
          })}
        </nav>
      </Shell>
    </div>
  );
}
