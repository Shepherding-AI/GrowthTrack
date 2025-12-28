export default function MarketingHome() {
  return (
    <main className="container">
      <h1>Growth Track SaaS Starter</h1>
      <p className="muted">
        This is the apex-domain marketing page. Tenants live on subdomains (e.g. <span className="badge">demo.localhost</span>).
      </p>

      <div className="card">
        <h2>Quick start</h2>
        <ol>
          <li>Copy <span className="badge">.env.example</span> to <span className="badge">.env</span> and set <span className="badge">DATABASE_URL</span></li>
          <li>Run <span className="badge">npm i</span></li>
          <li>Run <span className="badge">npm run db:push</span></li>
          <li>Run <span className="badge">npm run seed</span> (creates tenant <span className="badge">demo</span>)</li>
          <li>Start: <span className="badge">npm run dev</span></li>
        </ol>
        <p className="muted">
          Then open <span className="badge">http://demo.localhost:3000</span> (see README for hosts setup).
        </p>
      </div>
    </main>
  );
}
