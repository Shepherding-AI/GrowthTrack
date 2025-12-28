import { ImageResponse } from "next/og";
import { prisma } from "@/lib/db";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

function initials(name: string): string {
  const parts = name
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  const first = parts[0]?.[0] ?? "C";
  const second = (parts[1]?.[0] ?? parts[0]?.[1] ?? "H");
  return (first + second).toUpperCase();
}

export default async function Icon({
  params,
}: {
  params: { tenant: string };
}) {
  const slug = params.tenant;

  const tenant = await prisma.tenant.findUnique({
    where: { slug },
    select: { name: true },
  });

  const label = initials(tenant?.name ?? slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111827",
          color: "#ffffff",
          fontSize: 28,
          fontWeight: 800,
          letterSpacing: -1,
          borderRadius: 16,
        }}
      >
        {label}
      </div>
    ),
    { width: 64, height: 64 }
  );
}
