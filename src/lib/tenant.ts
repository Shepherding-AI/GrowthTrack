import { headers } from "next/headers";

/**
 * Resolves tenant slug that middleware attached.
 * For server components / route handlers.
 */
export function getTenantSlug(): string | null {
  const h = headers();
  return h.get("x-tenant-slug");
}
