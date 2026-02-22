import type { ExperienceItem } from "@/types/portfolio";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyStateCard, SectionHeading } from "@/components/portfolio/section-shared";

function formatPeriod(item: ExperienceItem) {
  const start = item.startDate || "";
  const end = item.isCurrent ? "Present" : item.endDate || "";
  return [start, end].filter(Boolean).join(" - ");
}

export function ExperienceSection({ title, items }: { title: string; items: ExperienceItem[] }) {
  if (!items.length) {
    return (
      <section id="experience" className="mt-16 w-full max-w-5xl mx-auto px-4">
        <SectionHeading title={title} />
        <EmptyStateCard
          title="No experience items yet"
          description="Add experience entries in Sanity to populate this section on the homepage."
        />
      </section>
    );
  }

  return (
    <section id="experience" className="mt-16 w-full max-w-5xl mx-auto px-4">
      <SectionHeading title={title} />
      <div className="space-y-3">
        {items.map((item) => (
          <Card key={item.id} className="bg-transparent">
            <CardHeader className="pb-2 px-4 sm:px-5 pt-4 sm:pt-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-3 items-start">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.imageAlt ?? `${item.company} logo`}
                      className="w-10 h-10 rounded-md object-cover border bg-background/70 shrink-0"
                    />
                  ) : null}
                  <div>
                    <CardTitle className="text-base sm:text-lg">{item.role}</CardTitle>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                      {item.company}
                      {item.employmentType ? ` · ${item.employmentType}` : ""}
                      {item.location ? ` · ${item.location}` : ""}
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">{formatPeriod(item)}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 px-4 sm:px-5 pb-4 sm:pb-5">
              <p className="text-sm leading-6 text-muted-foreground">{item.summary}</p>

              {item.highlights?.length ? (
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-muted-foreground">
                  {item.highlights.map((highlight, index) => (
                    <li key={`${item.id}-highlight-${index}`}>{highlight}</li>
                  ))}
                </ul>
              ) : null}

              {item.techTags?.length ? (
                <div className="flex flex-wrap gap-1.5">
                  {item.techTags.map((tag) => (
                    <span key={`${item.id}-${tag}`} className="text-[11px] px-2 py-0.5 rounded-full border bg-background/50">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
