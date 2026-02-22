import { usePortfolioContent } from "@/hooks/usePortfolioContent";

const AboutPage = () => {
  const { data } = usePortfolioContent();
  const about = data?.content.aboutPage;

  if (!about) {
    return <p className="p-4 text-sm text-muted-foreground">Loading…</p>;
  }

  return (
    <>
      <section id="profile-intro" className="flex flex-col items-center justify-center p-4">
        <div className="w-60 h-60 rounded-2xl overflow-hidden shadow-lg mt-10 border bg-card">
          {about.profileImageUrl ? (
            <img src={about.profileImageUrl} alt={`${about.name} profile`} className="w-full h-full object-cover" />
          ) : null}
        </div>
        <p className="text-2xl sm:text-3xl font-bold mt-3 text-center">{about.name}</p>
      </section>

      <section className="flex justify-center py-6">
        <div className="flex flex-col md:flex-row md:items-start gap-4 max-w-3xl w-full px-4">
          <span className="font-semibold whitespace-nowrap md:mr-10">{about.bioTitle}</span>
          <div className="text-base text-muted-foreground text-left space-y-4">
            {about.bioParagraphs.map((paragraph, index) => (
              <p key={`about-paragraph-${index}`}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
