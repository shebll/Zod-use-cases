import { responseSchema1, responseType } from "@/zodschema/zodschemas";

export async function Api() {
  const response = await fetch("http://localhost:3000/api/product", {
    method: "GET",
    cache: "no-cache",
  });
  const data: unknown = await response.json();
  const validData = responseSchema1.safeParse(data);
  if (validData.success) {
    console.log("data", validData);
    return <div>{validData.data.name}</div>;
  }
}
