export interface Slide {
  id: string;
  imageUrl: string;
  alt: string;
  title: string;
  subtitle: string;
  cta: { label: string; link: string };
}
