//import Cookies from "js-cookie";

export async function POST(request: Request) {
  if (request.method === "POST") {
    try {
      const { info_date, department_section, problem, source, item, customer, description, cause, countermeasure, form_type, pic, start_date, progress, target_due, actual_finish } = await request.json(); // Mengambil data dari request body

      const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/report/ncr`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ info_date, department_section, problem, source, item, customer, description, cause, countermeasure, form_type, pic, start_date, progress, target_due, actual_finish }),
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
