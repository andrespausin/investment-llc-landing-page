import { cacheLife } from "next/cache";

/**
 * Current year for the copyright notice. Cached so the page can still be
 * prerendered; it refreshes daily, which is enough to roll over each year.
 */
export async function CopyrightYear() {
  "use cache";
  cacheLife("days");

  return <>{new Date().getFullYear()}</>;
}
