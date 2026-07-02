import { Hero } from "@/components/home/hero";
import { Featured } from "@/components/home/featured";
import { About } from "@/components/home/about";
import { Experience } from "@/components/home/experience";
import { Achievements } from "@/components/home/achievements";
import { Skills } from "@/components/home/skills";
import { Contact } from "@/components/home/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <About />
      <Experience />
      <Achievements />
      <Skills />
      <Contact />
    </>
  );
}
