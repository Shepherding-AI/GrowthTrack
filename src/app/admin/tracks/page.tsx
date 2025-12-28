import Link from "next/link";
import { prisma } from "@/lib/db";
import { getTenantSlug } from "@/lib/tenant";

type StepRow = { id: string; order: number; name: string };
type TrackRow = { id: string; name: string; description: string | null; isActive: boolean; steps: StepRow[] };

export default async function TracksPage() {
  const tenantSlug = getTenantSlug();
  if (!tenantSlug) return null;

  const tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });
  if (!tenant) return <div className="card">Unknown tenant.</div>;

  const tracks: TrackRow[] = await prisma.track.findMany({
    where: { tenantId: tenant.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      description: true,
      isActive: true,
      steps: { orderBy: { order: "asc" }, select: { id: true, order: true, name: true } },
    },
  });

  return (
    <div className="grid">
      <div className="card">
        <h2>Tracks</h2>
        <p className="muted">MVP read-only listing. Next: CRUD + step editor.</p>
      </div>

      {tracks.map((t) => (
        <div key={t.id} className="card">
          <div className="stack" style={{ justifyContent: "space-between", alignItems: "center" }}>
            <strong>{t.name}</strong>
            <span className="badge">{t.isActive ? "Active" : "Inactive"}</span>
          </div>
          {t.description ? <p className="muted">{t.description}</p> : null}
          <ol className="muted">
            {t.steps.map((s) => (
              <li key={s.id}>Step {s.order}: {s.name}</li>
            ))}
          </ol>
          <div className="stack">
            <Link className="btn" href={`/t/${tenant.slug}`}>View tenant</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
