import Link from "next/link";
import { isNextBuild } from "@/lib/buildPhase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function TenantHome({ params }: { params: { tenant: string } }) {
  const { tenant } = params;
  return (
    <main className="container">
      <div className="stack" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <h1>{tenant} · Growth Track</h1>
        <span className="badge">tenant: {tenant}</span>
      </div>

      <p className="muted">
        This is the tenant landing page. In production, this is what loads at <span className="badge">/t/{tenant}</span>.
      </p>

      <div className="grid grid2">
        <div className="card">
          <h2>Attendee</h2>
          <p className="muted">Public signup and progress pages.</p>
          <div className="stack">
            <Link className="btn btnPrimary" href={`/t/${tenant}/signup`}>Signup</Link>
            <Link className="btn" href={`/t/${tenant}/me`}>My Progress</Link>
          </div>
        </div>

        <div className="card">
          <h2>Admin</h2>
          <p className="muted">Starter admin area (token-protected for now).</p>
          <div className="stack">
            <Link className="btn btnPrimary" href={`/t/${tenant}/admin`}>Admin Dashboard</Link>
            <Link className="btn" href={`/t/${tenant}/admin/tracks`}>Tracks</Link>
            <Link className="btn" href={`/t/${tenant}/admin/people`}>People</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
