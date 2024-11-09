import Cookies from "js-cookie";

export async function PUT(request: Request) {
  if (request.method === "PUT") {
    try {
      const { info_date, department_section, problem, source, item, customer, description, cause, countermeasure, form_type, pic, start_date, progress, target_due, actual_finish, _id } = await request.json(); // Mengambil data dari request body
      const token = Cookies.get("token");

      const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/report/ncr`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { authorization: token })
        },
        body: JSON.stringify({ info_date, department_section, problem, source, item, customer, description, cause, countermeasure, form_type, pic, start_date, progress, target_due, actual_finish, _id }),
      });

      const data = await apiRes.json();

      if (data.code === 200) {
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
