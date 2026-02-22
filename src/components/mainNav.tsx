import { useNavigate } from "react-router";

import { usePortfolioContent } from "@/hooks/usePortfolioContent";
import { Button } from "@/components/ui/button";

export default function MainNav() {
  const navigate = useNavigate();
  const { data } = usePortfolioContent();
  const siteSettings = data?.content.siteSettings;

  const navItems = siteSettings?.navItems ?? [];

  return (
    <div className="flex items-center justify-between px-4 py-2 w-full">
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold">{siteSettings?.brandName ?? "0xkenn"}</span>
      </div>

      <div className="hidden md:flex gap-5 items-center">
        {navItems.map((item) => (
          <Button
            key={`${item.path}-${item.label}`}
            variant="link"
            onClick={() => {
              if (item.external) {
                window.open(item.path, "_blank", "noopener,noreferrer");
                return;
              }
              navigate(item.path);
            }}
          >
            {item.label}
          </Button>
        ))}

        {siteSettings?.resumeUrl ? (
          <Button onClick={() => window.open(siteSettings.resumeUrl, "_blank", "noopener,noreferrer")}>
            Resume
          </Button>
        ) : null}
      </div>
    </div>
  );
}
