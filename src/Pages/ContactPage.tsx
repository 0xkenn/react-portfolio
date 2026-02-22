import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";

const ContactPage = () => {
  const { data } = usePortfolioContent();
  const contact = data?.content.contactPage;

  if (!contact) {
    return <p className="p-4 text-sm text-muted-foreground">Loading…</p>;
  }

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-10">
      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle className="text-2xl">{contact.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-6">{contact.description}</p>
          {contact.email ? (
            <p className="text-sm">
              Email: <a className="underline" href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
          ) : null}
          {contact.ctaLabel && contact.ctaUrl ? (
            <Button asChild>
              <a href={contact.ctaUrl} target="_blank" rel="noreferrer">
                {contact.ctaLabel}
              </a>
            </Button>
          ) : null}
        </CardContent>
      </Card>
    </section>
  );
};

export default ContactPage;
