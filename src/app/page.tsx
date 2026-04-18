import { Hero } from "@/components/sections/Hero";
import { WorksGrid } from "@/components/sections/WorksGrid";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Navigation } from "@/components/layout/Navigation";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { FilmGrain } from "@/components/effects/FilmGrain";
import { getAllWorks } from "@/lib/notion";

// Revalidate the Notion-backed content every 60s (SPEC 2.5)
export const revalidate = 60;

export default async function Home() {
  const works = await getAllWorks();

  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <FilmGrain />
      <Navigation />
      <main>
        <Hero />
        <WorksGrid works={works} />
        <About />
        <Contact />
      </main>
    </>
  );
}
