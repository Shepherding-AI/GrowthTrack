/**
 * Next sometimes executes Server Components during `next build` to "collect page data".
 * When deploying on platforms that install without devDependencies, Prisma Client may not
 * be generated yet, causing "@prisma/client did not initialize yet".
 *
 * We use this guard to avoid DB access during the build phase.
 */
export function isNextBuild(): boolean {
  return process.env.NEXT_PHASE === "phase-production-build";
}
