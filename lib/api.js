const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");

let cached = { token: null, expiresAt: 0 };

export function clearToken() {
  cached = { token: null, expiresAt: 0 };
}

// Fetch (and cache) the JWT access token issued for the current session.
async function getToken() {
  if (cached.token && Date.now() < cached.expiresAt - 30_000) return cached.token;
  const res = await fetch("/api/token", { credentials: "include", cache: "no-store" });
  if (!res.ok) {
    clearToken();
    throw Object.assign(new Error("Please log in to continue"), { status: 401 });
  }
  cached = await res.json();
  return cached.token;
}

export async function api(path, { method = "GET", body, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) headers.Authorization = `Bearer ${await getToken()}`;

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Cannot reach the server. Please try again.");
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw Object.assign(new Error(data.message || "Something went wrong"), { status: res.status });
  }
  return data;
}

export const toQuery = (params) => {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "" && v !== "all") q.set(k, v);
  });
  const s = q.toString();
  return s ? `?${s}` : "";
};
