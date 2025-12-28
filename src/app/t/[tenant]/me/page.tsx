import Link from "next/link";

export default function MyProgress({ params }: { params: { tenant: string } }) {
  return (
    <main className="container">
      <div className="stack" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <h1>My Growth Track · {params.tenant}</h1>
        <Link className="btn" href={`/t/${params.tenant}`}>Back</Link>
      </div>

      <div className="card">
        <p className="muted">
          MVP stub: in V1 we’ll use magic links (email/SMS) to authenticate a person and show their progress.
        </p>
      </div>
    </main>
  );
}
