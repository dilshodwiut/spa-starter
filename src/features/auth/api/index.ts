export async function login(data: object): Promise<Response> {
  const res = await fetch(`${import.meta.env.VITE_AUTH_URL}/auth/login`, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}

export async function register(data: object): Promise<Response> {
  const res = await fetch(`${import.meta.env.VITE_AUTH_URL}/auth/register`, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}
