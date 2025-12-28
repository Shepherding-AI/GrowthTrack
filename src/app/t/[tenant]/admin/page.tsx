import { prisma } from "@/lib/db";
import { isNextBuild } from "@/lib/buildPhase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminHome({ params }: { params: { tenant: string } }) {
  if (isNextBuild()) {
    return (
      <main className="container">
        <h1>Building…</h1>
        <p className="muted">This page loads at runtime.</p>
      </main>
    );
  }

  
  

  const tenant = await prisma.tenant.findUnique({ where: { slug: params.tenant } });
  const counts = await prisma.$transaction([
    prisma.person.count({ where: { tenantId: tenant?.id ?? "___" } }),
    prisma.track.count({ where: { tenantId: tenant?.id ?? "___" } }),
    prisma.cohort.count({ where: { tenantId: tenant?.id ?? "___" } }),
  ]);

  return (
    <div className="grid grid2">
      <div className="card">
        <h2>{tenant?.name ?? params.tenant}</h2>
        <p className="muted">Starter admin dashboard.</p>
      </div>

      <div className="card">
        <h3>Counts</h3>
        <ul className="muted">
          <li>People: {counts[0]}</li>
          <li>Tracks: {counts[1]}</li>
          <li>Cohorts: {counts[2]}</li>
        </ul>
      </div>
    </div>
  );
}
