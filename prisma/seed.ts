import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const slug = process.env.SEED_TENANT_SLUG ?? "demo";
  const name = process.env.SEED_TENANT_NAME ?? "Demo Church";

  const tenant = await prisma.tenant.upsert({
    where: { slug },
    update: { name },
    create: { slug, name },
  });

  // minimal sample track/steps
  const track = await prisma.track.upsert({
    where: { id: `${tenant.id}-default-track` },
    update: {},
    create: {
      id: `${tenant.id}-default-track`,
      tenantId: tenant.id,
      name: "Growth Track",
      description: "Default 4-step Growth Track",
      steps: {
        create: [
          { tenantId: tenant.id, order: 1, name: "Step 1: Welcome" },
          { tenantId: tenant.id, order: 2, name: "Step 2: Essentials" },
          { tenantId: tenant.id, order: 3, name: "Step 3: Discover" },
          { tenantId: tenant.id, order: 4, name: "Step 4: Team" },
        ],
      },
    },
  });

  console.log("Seeded tenant:", tenant.slug, tenant.id);
  console.log("Seeded track:", track.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
