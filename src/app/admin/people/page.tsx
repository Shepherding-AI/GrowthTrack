import { prisma } from "@/lib/db";
import { getTenantSlug } from "@/lib/tenant";

type PersonRow = {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
};

export default async function PeoplePage() {
  const tenantSlug = getTenantSlug();
  if (!tenantSlug) return null;

  const tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });
  if (!tenant) return <div className="card">Unknown tenant.</div>;

  const people: PersonRow[] = await prisma.person.findMany({
    where: { tenantId: tenant.id },
    orderBy: { createdAt: "desc" },
    take: 50,
    select: { id: true, firstName: true, lastName: true, email: true, phone: true },
  });

  return (
    <div className="grid">
      <div className="card">
        <h2>People</h2>
        <p className="muted">MVP read-only listing (latest 50). Next: search + enrollments.</p>
      </div>

      <div className="card">
        {people.length === 0 ? (
          <p className="muted">No people yet. Wire up signup to start creating people.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left" }}>
                <th style={{ padding: "8px 0" }}>Name</th>
                <th style={{ padding: "8px 0" }}>Email</th>
                <th style={{ padding: "8px 0" }}>Phone</th>
              </tr>
            </thead>
            <tbody>
              {people.map((p) => (
                <tr key={p.id} style={{ borderTop: "1px solid #eee" }}>
                  <td style={{ padding: "10px 0" }}>{p.firstName} {p.lastName}</td>
                  <td style={{ padding: "10px 0" }}>{p.email ?? "—"}</td>
                  <td style={{ padding: "10px 0" }}>{p.phone ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
