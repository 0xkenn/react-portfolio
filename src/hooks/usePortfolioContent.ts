import { useQuery } from "@tanstack/react-query";

import { defaultPortfolioContent } from "@/lib/default-portfolio-content";
import { getPortfolioContent } from "@/lib/portfolio-content";

export function usePortfolioContent() {
  return useQuery({
    queryKey: ["portfolio-content"],
    queryFn: getPortfolioContent,
    placeholderData: {
      content: defaultPortfolioContent,
      source: "fallback" as const,
    },
    staleTime: 1000 * 60 * 5,
  });
}
