import "server-only";

// Thin Supabase REST client (PostgREST). No SDK needed for inserts + public reads.
// Uses the anon key; Row Level Security (supabase/schema.sql) limits it to
// "insert submissions" and "read published content".

const URL = process.env.SUPABASE_URL?.replace(/\/$/, "");
const KEY = process.env.SUPABASE_ANON_KEY;

export const supabaseEnabled = Boolean(URL && KEY);

function headers(extra?: Record<string, string>) {
  return {
    apikey: KEY!,
    Authorization: `Bearer ${KEY}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

export async function sbInsert(table: string, row: Record<string, unknown>) {
  const res = await fetch(`${URL}/rest/v1/${table}`, {
    method: "POST",
    headers: headers({ Prefer: "return=minimal" }),
    body: JSON.stringify(row),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Supabase insert into ${table} failed: ${res.status} ${await res.text()}`);
}

export async function sbSelect<T>(table: string, query: string, revalidate = 300): Promise<T[]> {
  const res = await fetch(`${URL}/rest/v1/${table}?${query}`, {
    headers: headers(),
    next: { revalidate, tags: [table] },
  });
  if (!res.ok) throw new Error(`Supabase select from ${table} failed: ${res.status}`);
  return res.json();
}
