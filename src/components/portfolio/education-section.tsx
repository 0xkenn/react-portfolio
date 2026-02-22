import type { EducationItem } from "@/types/portfolio";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyStateCard, SectionHeading } from "@/components/portfolio/section-shared";

function formatPeriod(item: EducationItem) {
  return [item.startDate, item.endDate].filter(Boolean).join(" - ");
}

export function EducationSection({ title, items }: { title: string; items: EducationItem[] }) {
  if (!items.length) {
    return (
      <section id="education" className="mt-16 w-full max-w-5xl mx-auto px-4">
        <SectionHeading title={title} />
        <EmptyStateCard
          title="No education items yet"
          description="Add education entries in Sanity to show your schools, degrees, and highlights here."
        />
      </section>
    );
  }

  return (
    <section id="education" className="mt-16 w-full max-w-5xl mx-auto px-4">
      <SectionHeading title={title} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item) => (
          <Card key={item.id} className="bg-transparent h-full">
            <CardHeader className="pb-2 px-4 sm:px-5 pt-4 sm:pt-5">
              <div className="flex gap-3 items-start">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.imageAlt ?? `${item.school} logo`}
                    className="w-10 h-10 rounded-md object-cover border bg-background/70 shrink-0"
                  />
                ) : null}
                <div>
                  <CardTitle className="text-base sm:text-lg">{item.school}</CardTitle>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    {item.degree}
                    {item.program ? ` · ${item.program}` : ""}
                  </p>
                </div>
              </div>
              {formatPeriod(item) ? <p className="text-xs text-muted-foreground">{formatPeriod(item)}</p> : null}
            </CardHeader>
            <CardContent className="space-y-3 px-4 sm:px-5 pb-4 sm:pb-5">
              {item.honors ? <p className="text-sm font-medium">{item.honors}</p> : null}
              {item.description ? <p className="text-sm leading-6 text-muted-foreground">{item.description}</p> : null}
              {item.tags?.length ? (
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
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
