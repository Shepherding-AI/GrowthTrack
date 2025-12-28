import Link from "next/link";
import { prisma } from "@/lib/db";
import { isNextBuild } from "@/lib/buildPhase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SignupPage({ params }: { params: { tenant: string } }) {
  if (isNextBuild()) {
    return (
      <main className="container">
        <h1>Building…</h1>
        <p className="muted">This page loads at runtime.</p>
      </main>
    );
  }

  const tenant = await prisma.tenant.findUnique({ where: { slug: params.tenant } });

  return (
    <main className="container">
      <div className="stack" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <h1>Signup · {tenant?.name ?? params.tenant}</h1>
        <Link className="btn" href={`/t/${params.tenant}`}>Back</Link>
      </div>

      <div className="card">
        <p className="muted">
          MVP stub: you’ll replace this with a real form and enrollment logic.
        </p>

        <p className="muted">
          Next up: POST to <span className="badge">/api/public/signup</span> and create:
          <span className="badge">Person</span> + <span className="badge">Enrollment</span> + <span className="badge">FormSubmission</span>.
        </p>
      </div>
    </main>
  );
}
