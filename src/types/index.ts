// types/index.ts

export interface CloudinaryPhoto {
  public_id: string;
  secure_url: string;
  filename?: string;
  format?: string;
  width?: number;
  height?: number;
}

// Isso ajuda o SearchHeader a saber exatamente o que esperar
export type CategoriaType = string;
