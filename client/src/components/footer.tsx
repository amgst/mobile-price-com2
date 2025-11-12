import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t bg-card mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="https://mobileapi.dev" target="_blank" rel="noopener noreferrer" className="hover-elevate inline-block px-1 py-0.5 rounded" data-testid="link-about">
                  About Us
                </a>
              </li>
              <li>
                <a href="https://mobileapi.dev/docs/" target="_blank" rel="noopener noreferrer" className="hover-elevate inline-block px-1 py-0.5 rounded" data-testid="link-api-docs">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="https://mobileapi.cronitorstatus.com/" target="_blank" rel="noopener noreferrer" className="hover-elevate inline-block px-1 py-0.5 rounded" data-testid="link-status">
                  Status Page
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Devices</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/browse?type=phones">
                  <a className="hover-elevate inline-block px-1 py-0.5 rounded" data-testid="link-phones">
                    Phones
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/browse?type=tablets">
                  <a className="hover-elevate inline-block px-1 py-0.5 rounded" data-testid="link-tablets">
                    Tablets
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/browse?type=wearables">
                  <a className="hover-elevate inline-block px-1 py-0.5 rounded" data-testid="link-wearables">
                    Wearables
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="https://mobileapi.dev" target="_blank" rel="noopener noreferrer" className="hover-elevate inline-block px-1 py-0.5 rounded" data-testid="link-pricing">
                  Pricing
                </a>
              </li>
              <li>
                <a href="https://mobileapi.dev" target="_blank" rel="noopener noreferrer" className="hover-elevate inline-block px-1 py-0.5 rounded" data-testid="link-support">
                  Support
                </a>
              </li>
              <li>
                <Link href="/compare">
                  <a className="hover-elevate inline-block px-1 py-0.5 rounded" data-testid="link-compare-footer">
                    Compare Devices
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest device releases and updates.
            </p>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                Powered by MobileAPI.dev
              </Badge>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2025 MobileHub. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover-elevate px-2 py-1 rounded" data-testid="link-privacy">
              Privacy
            </a>
            <a href="#" className="hover-elevate px-2 py-1 rounded" data-testid="link-terms">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Badge } from "@/components/ui/badge";
