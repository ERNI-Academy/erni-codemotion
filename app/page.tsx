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
        title="Play Who is Who and get your caricature!"
        paragraph1={`We had a blast seeing your real-world version at our stand. Now it's time to find your cartoon alter ego!<br />
Play our "Who is Who" mini game to debug your identity spot your caricature among the crowd and download your digital twin.`}
        paragraph2="Warning: high chance of laughing at your own pixel-perfect face."
        buttonText="Let's play! →"
        secondaryButtonText="Let's play in 3D! →"
        buttonLink="/whoIsWho"
        imageSrc="/robotImage.png"
        imageAlt="Team collaboration - Woman and man working together on laptop"
        imagePosition="right"
      />
      <FooterBanner />
    </div>
  );
}
