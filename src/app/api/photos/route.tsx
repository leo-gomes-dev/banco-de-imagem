import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get("tag");
    const cursor = searchParams.get("cursor"); // O Frontend envia isso ao clicar em "Próximo"

    // Define a pasta. Lembre-se: se estiver dentro de 'Home', use 'Home/alunos_fotos'
    const folderPath =
      categoria && categoria !== "all"
        ? `alunos_fotos/${categoria}/*`
        : `alunos_fotos/*`;

    const results = await cloudinary.search
      .expression(`folder:${folderPath}`)
      .sort_by("public_id", "desc")
      .max_results(12) // Quantidade de fotos por página
      .next_cursor(cursor || undefined) // O segredo da paginação está aqui
      .execute();

    // RETORNO OBRIGATÓRIO PARA O FRONTEND FUNCIONAR:
    return NextResponse.json({
      resources: results.resources,
      next_cursor: results.next_cursor || null,
    });
  } catch (error) {
    console.error("Erro Cloudinary:", error);
    return NextResponse.json(
      { error: "Erro ao buscar fotos" },
      { status: 500 },
    );
  }
}
