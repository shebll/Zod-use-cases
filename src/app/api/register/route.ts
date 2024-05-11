import { formSchema } from "@/zodschema/zodschemas";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: unknown = await req.json();

  const result = formSchema.safeParse(body);
  let zodErrors = {};

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    return NextResponse.json({ success: false, errors: zodErrors });
  }

  return NextResponse.json({ success: true, data: result.data });
}
