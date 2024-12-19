import Cookies from "js-cookie";
import { getToken } from "@/utils/auth";

export async function PUT(request: Request) {
  if (request.method === "PUT") {
    try {
      const {
        _id,
        operator,
        name_part,
        process: processName,
        target,
        start,
        end,
        total,
        ok,
        ng,
        type_ng,
        keterangan,
      } = await request.json(); // Mengambil data dari request body
      const token = Cookies.get("token");

      const apiRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/report/final-inspection`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token && { authorization: token })
          },
          body: JSON.stringify({
            _id,
            operator,
            name_part,
            process: processName,
            target,
            start,
            end,
            total,
            ok,
            ng,
            type_ng,
            keterangan,
          }),
        }
      );

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
