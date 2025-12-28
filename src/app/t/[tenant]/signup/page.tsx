import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function SignupPage({ params }: { params: { tenant: string } }) {
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
