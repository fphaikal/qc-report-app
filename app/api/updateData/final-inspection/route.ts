//import Cookies from "js-cookie";

export async function PUT(request: Request) {
  if (request.method === "PUT") {
    try {
      const { 
        id,
        operator, 
        name_part,
        process,
        target,
        start,
        end,
        total,
        ok,
        ng,
        type_ng,
        keterangan } = await request.json(); // Mengambil data dari request body

      const apiRes = await fetch(`http://localhost:2025/api/report/final-inspection`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, operator, name_part,
          process,
          target,
          start,
          end,
          total,
          ok,
          ng,
          type_ng,
          keterangan }),
      });

      const data = await apiRes.json();

      if (apiRes.ok && data.code === 200) {
        return new Response(JSON.stringify(data), { status: 200 });
      } else {
        return new Response(
          JSON.stringify({ message: data.message || "Update data failed" }),
          { status: 400 }
        );
      }
    } catch (error) {
      console.error("Update data error:", error);
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
