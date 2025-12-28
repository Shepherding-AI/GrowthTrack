import type { Metadata } from "next";
import { prisma } from "@/lib/db";

export async function generateMetadata({
  params,
}: {
  params: { tenant: string };
}): Promise<Metadata> {
  const slug = params.tenant;

  const tenant = await prisma.tenant.findUnique({
    where: { slug },
    select: { name: true, slug: true },
  });

  const name = tenant?.name ?? slug;
  return {
    title: `${name} · Growth Track`,
    description: `Growth Track for ${name}`,
    // Icon is handled by /t/[tenant]/icon.tsx (dynamic per tenant).
  };
}

export default function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
