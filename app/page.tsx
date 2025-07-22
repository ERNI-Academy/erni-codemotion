import Image from "next/image";
import Button from '@mui/material/Button';
import AppBarComponent from "@/components/appBar";
import VideoBanner from "@/components/VideoBanner";
import Section from "@/components/section";
import FooterBanner from "@/components/footerBanner";

export default function Home() {
  return (
    <div>
      <AppBarComponent />
      <VideoBanner />
      <Section
        title="Thank you for visiting us in Codemotion 2025"
        paragraph1="It has been a pleasure to experiment with you by combining technologies such as AI, Robotics, Frontend, and Cybersecurity."
        paragraph2="To thank you, we have prepared a small game so you can find the original of your caricature and discover how our AI represented your photo. Enjoy it!"
        buttonText="Find your picture →"
        buttonLink="/whoIsWho"
        imageSrc="/robotImage.png"
        imageAlt="Team collaboration - Woman and man working together on laptop"
        imagePosition="right"
      />
      <FooterBanner />
    </div>
  );
}
