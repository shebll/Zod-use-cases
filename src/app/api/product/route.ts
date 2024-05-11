import { responseSchema } from "@/zodschema/zodschemas";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  console.log("get method api called");

  const product = {
    name: "Ahmed",
    id: "1213123",
    phone: "01143423222",
    age: 22,
  };
  const validDAta = responseSchema.safeParse(product);
  if (!validDAta.success) {
    return NextResponse.json({ message: "invalid data" });
  }
  return NextResponse.json(validDAta.data);
};
