import Cookies from "js-cookie";

export async function POST(request: Request) {
  if (request.method === "POST") {
    try {
      const { ncr_date, section, product_name, last_process, customer, value, ng_type, ng_quantity, operator, detection, status, month, year } = await request.json(); // Mengambil data dari request body
      const token = Cookies.get("token");

      const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/report/ngData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { authorization: token })   
        },
        body: JSON.stringify({ ncr_date, section, product_name, last_process, customer, value, ng_type, ng_quantity, operator, detection, status, }),
      });

      const data = await apiRes.json();

      if (data.code === 201) {
        return new Response(JSON.stringify(data), { status: 201 });
      } else {
        return new Response(
          JSON.stringify({ message: data.message || "Create data failed" }),
          { status: 400 }
        );
      }
    } catch (error) {
      console.error("Create data error:", error);
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
