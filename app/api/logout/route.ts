import { cookies } from "next/headers";

export async function POST(request: Request) {
    if (request.method === "POST") {
      try {
        const { token } = await request.json(); // Mengambil data dari request body
  
        const apiRes = await fetch(`http://localhost:2025/api/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
  
        const data = await apiRes.json();
        
        if (apiRes.ok && data.code === 200) {
          const resCookie = cookies()
          resCookie.set("token", '', {
            expires: 0, 
          })
          return new Response(JSON.stringify(data), { status: 200 });
        } else {
          return new Response(
            JSON.stringify({ message: data.message || "Logout failed" }),
            { status: 400 }
          );
        }
      } catch (error) {
        console.error("Logout error:", error);
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
  