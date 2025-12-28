import { cookies, headers } from "next/headers";

const COOKIE_NAME = "gt_admin";

export function isAdminRequest(): boolean {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return false;

  const h = headers();
  const headerToken = h.get("x-admin-token");

  const c = cookies();
  const cookieToken = c.get(COOKIE_NAME)?.value;

  return headerToken === token || cookieToken === token;
}

export const adminCookieName = COOKIE_NAME;
