export async function POST(request: Request) {
  if (request.method === "POST") {
    try {
      const { username, password } = await request.json(); // Mengambil data dari request body

      const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await apiRes.json();

      if (apiRes.ok && data.code === 200) {
        return new Response(JSON.stringify(data), { status: 200 });
      } else {
        return new Response(
          JSON.stringify({ message: data.message || "Login failed" }),
          { status: 400 }
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      return new Response(
        JSON.stringify({ message: "Internal Server Error" }),
        { status: 500 }
      );
    }
  } else {
    return new Response(
      JSON.stringify({ message: `Method ${request.method} Not Allowed` }),
      { status: 405 }
    );
  }
}
