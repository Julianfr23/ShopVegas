export interface SavedDesign {
  id: string;
  name: string;
  measures: string[];   // Ej: ["140x100 cm", "200x150 cm"]
  width: number;        // ancho real del canvas
  height: number;       // alto real del canvas
}
