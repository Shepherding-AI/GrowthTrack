import Link from "next/link";
import { isAdminRequest } from "@/lib/adminAuth";
import { getTenantSlug } from "@/lib/tenant";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const isAdmin = isAdminRequest();
  const tenant = getTenantSlug();

  if (!tenant) {
    return (
      <main className="container">
        <h1>Admin</h1>
        <p className="muted">Open admin from a tenant subdomain (e.g. <span className="badge">demo.localhost:3000/admin</span>).</p>
      </main>
    );
  }

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
          <Link className="btn" href={`/admin`}>Dashboard</Link>
          <Link className="btn" href={`/admin/tracks`}>Tracks</Link>
          <Link className="btn" href={`/admin/people`}>People</Link>
          <Link className="btn" href={`/t/${tenant}`}>Tenant Home</Link>
        </div>
      </div>

      {children}
    </main>
  );
}
