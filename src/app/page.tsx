import { getBlogs, getProjects, getArt, getResearch, getLife } from "@/lib/notion/queries";
import { HeroSection } from "@/components/hero/HeroSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { ArtSection } from "@/components/sections/ArtSection";
import { ResearchSection } from "@/components/sections/ResearchSection";
import { LifeSection } from "@/components/sections/LifeSection";
import { Footer } from "@/components/layout/Footer";

export const revalidate = 0;

export default async function Home() {
  const [blogs, projects, art, research, life] = await Promise.all([
    getBlogs(),
    getProjects(),
    getArt(),
    getResearch(),
    getLife(),
  ]);

  return (
    <>
      {/* White content layer — covers the fixed video behind it */}
      <main className="relative z-10 bg-white pb-32 md:pb-40">
        <HeroSection />
        <BlogSection items={blogs} />
        <ProjectSection items={projects} />
        <ResearchSection items={research} />
        <ArtSection items={art} />
        <LifeSection items={life} />
      </main>

      {/* Footer sits outside main so the transparent spacer reveals the video */}
      <Footer />
    </>
  );
}
