import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { contactoSchema } from "@/lib/schemas/contacto";
import { checkRateLimit } from "@/lib/ratelimit";

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";

  const { allowed } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Intentá más tarde." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const parsed = contactoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { nombre, telefono, localidad, descripcion, disponibilidad, origen } =
    parsed.data;

  const supabase = getServiceClient();
  const { error } = await supabase.from("contactos").insert({
    nombre,
    telefono,
    localidad,
    descripcion_proyecto: descripcion,
    disponibilidad: disponibilidad.join(", "),
    origen,
    leido: false,
  });

  if (error) {
    console.error("[api/contactos] insert error:", error.message);
    return NextResponse.json(
      { error: "No se pudo guardar la consulta." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
