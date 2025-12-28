import { prisma } from "@/lib/db";
import { getTenantSlug } from "@/lib/tenant";

export default async function AdminHome() {
  const tenantSlug = getTenantSlug();
  if (!tenantSlug) return null;

  const tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });
  const counts = await prisma.$transaction([
    prisma.person.count({ where: { tenantId: tenant?.id ?? "___" } }),
    prisma.track.count({ where: { tenantId: tenant?.id ?? "___" } }),
    prisma.cohort.count({ where: { tenantId: tenant?.id ?? "___" } }),
  ]);

  return (
    <div className="grid grid2">
      <div className="card">
        <h2>{tenant?.name ?? tenantSlug}</h2>
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
