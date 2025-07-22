import Image from "next/image";
import Button from '@mui/material/Button';
import AppBarComponent from "@/components/appBar";
import VideoBanner from "@/components/VideoBanner";
import Section from "@/components/section";

export default function Home() {
  return (
    <div>
      <AppBarComponent />
      <VideoBanner />
      <Section
        title="better ask ERNI"
        paragraph1="We pave the way to the digital tomorrow. We are experts in innovation, technology, software and digitizing business processes."
        paragraph2="Our expertise in technologies and methods, combined with our understanding of customer domains, enables us to connect the physical and digital worlds. This makes us the ideal consultant. We are happy to help."
        buttonText="Find out more about us →"
        buttonLink="/about"
        imageSrc="/team-collaboration.jpg"
        imageAlt="Team collaboration - Woman and man working together on laptop"
      />
    </div>
  );
}
