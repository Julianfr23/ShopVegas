export interface ExplainProcess {
  n: number;
  icon?: string;
  title: string;
  text: string;
  media: string;            // ruta al mp4 (ej: 'assets/video/diseno.mp4')
  thumb?: string;           // opcional si alguna vez quieres poster
  mediaType: 'video' | 'img';
}
