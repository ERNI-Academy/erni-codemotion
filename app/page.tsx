import Image from "next/image";
import Button from '@mui/material/Button';
import AppBarComponent from "@/components/appBar";
import VideoBanner from "@/components/VideoBanner";

export default function Home() {
  return (
    <div>
      <AppBarComponent />
      <VideoBanner />
    </div>
  );
}
