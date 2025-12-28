import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const SignupSchema = z.object({
  tenantSlug: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().min(7).optional(),
});

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = SignupSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { tenantSlug, firstName, lastName, email, phone } = parsed.data;

  const tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });
  if (!tenant) return NextResponse.json({ error: "Unknown tenant" }, { status: 404 });

  const person = await prisma.person.create({
    data: {
      tenantId: tenant.id,
      firstName,
      lastName,
      email,
      phone,
    },
  });

  // TODO: enroll in default track, create form submission, fire automations
  return NextResponse.json({ ok: true, personId: person.id });
}
