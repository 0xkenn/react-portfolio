import { useState } from "react";
import { useNavigate } from "react-router";
import { Menu as MenuIcon } from "lucide-react";

import { usePortfolioContent } from "@/hooks/usePortfolioContent";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { data } = usePortfolioContent();
  const siteSettings = data?.content.siteSettings;

  const navItems = siteSettings?.navItems ?? [];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation menu">
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent side="left">
        <div className="flex flex-col items-start mt-8 gap-1">
          {navItems.map((item) => (
            <Button
              key={`${item.path}-${item.label}`}
              variant="link"
              onClick={() => {
                if (item.external) {
                  window.open(item.path, "_blank", "noopener,noreferrer");
                } else {
                  navigate(item.path);
                }
                setOpen(false);
              }}
            >
              {item.label}
            </Button>
          ))}

          {siteSettings?.resumeUrl ? (
            <Button
              onClick={() => {
                window.open(siteSettings.resumeUrl, "_blank", "noopener,noreferrer");
                setOpen(false);
              }}
            >
              Resume
            </Button>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}
