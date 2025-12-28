import Link from "next/link";
import { isAdminRequest } from "@/lib/adminAuth";

export default function AdminLayout({ children, params }: { children: React.ReactNode; params: { tenant: string } }) {
  const isAdmin = isAdminRequest();
  const tenant = params.tenant;
  

  if (!isAdmin) {
    return (
      <main className="container">
        <h1>Admin locked</h1>
        <p className="muted">
          Starter uses a simple token. See README for how to set cookie <span className="badge">gt_admin</span>
          or send header <span className="badge">x-admin-token</span>.
        </p>
        <Link className="btn" href={`/t/${tenant}`}>Back</Link>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="stack" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <div className="stack" style={{ alignItems: "center" }}>
          <h1 style={{ marginRight: 8 }}>Admin</h1>
          <span className="badge">tenant: {tenant}</span>
        </div>
        <div className="stack">
          <Link className="btn" href={`/t/${tenant}/admin`}>Dashboard</Link>
          <Link className="btn" href={`/t/${tenant}/admin/tracks`}>Tracks</Link>
          <Link className="btn" href={`/t/${tenant}/admin/people`}>People</Link>
          <Link className="btn" href={`/t/${tenant}`}>Tenant Home</Link>
        </div>
      </div>

      {children}
    </main>
  );
}
