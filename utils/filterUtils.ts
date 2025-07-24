import { CaricatureFeatures } from "@/data/imagesData";

export interface CaricatureImage {
  name: string;
  src: string;
  size: string;
  features: number[];
}

export interface Question {
  id: number;
  text: string;
  feature: CaricatureFeatures;
}

export const questions: Question[] = [
  { id: 1, text: "Does your caricature wear glasses?", feature: CaricatureFeatures.GLASSES },
  { id: 2, text: "Does your caricature have a beard?", feature: CaricatureFeatures.BEARD },
  { id: 3, text: "Does your caricature have long hair?", feature: CaricatureFeatures.LONG_AIR },
  { id: 4, text: "Does your caricature wear earrings?", feature: CaricatureFeatures.EARRINGS },
  { id: 5, text: "Are you a man?", feature: CaricatureFeatures.MAN }
];

export const filterImagesBySequence = (images: CaricatureImage[], answers: boolean[]): CaricatureImage[] => {
  return images.filter(image => {
    // Verificar que la imagen tenga la secuencia de respuestas
    for (let i = 0; i < answers.length; i++) {
      const expectedValue = answers[i] ? 1 : 0;
      if (image.features[i] !== expectedValue) {
        return false;
      }
    }
    return true;
  });
};

export const downloadImage = (imageSrc: string, imageName: string) => {
  const link = document.createElement('a');
  link.href = imageSrc;
  link.download = imageName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}; 