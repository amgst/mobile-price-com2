import { Link } from "wouter";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/">
          <a className="flex items-center gap-2 hover-elevate rounded-md px-3 py-2" data-testid="link-home">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">M</span>
            </div>
            <span className="font-semibold text-lg hidden sm:inline">MobileHub</span>
          </a>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/browse">
            <a className="text-sm font-medium hover-elevate px-3 py-2 rounded-md" data-testid="link-browse">
              Browse All
            </a>
          </Link>
          <Link href="/compare">
            <a className="text-sm font-medium hover-elevate px-3 py-2 rounded-md" data-testid="link-compare">
              Compare
            </a>
          </Link>
          <a href="https://mobileapi.dev/docs/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover-elevate px-3 py-2 rounded-md" data-testid="link-docs">
            API Docs
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background px-4 py-4">
          <nav className="flex flex-col gap-4">
            <Link href="/browse">
              <a className="text-sm font-medium hover-elevate px-3 py-2 rounded-md block" data-testid="link-browse-mobile">
                Browse All
              </a>
            </Link>
            <Link href="/compare">
              <a className="text-sm font-medium hover-elevate px-3 py-2 rounded-md block" data-testid="link-compare-mobile">
                Compare
              </a>
            </Link>
            <a href="https://mobileapi.dev/docs/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover-elevate px-3 py-2 rounded-md block" data-testid="link-docs-mobile">
              API Docs
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
