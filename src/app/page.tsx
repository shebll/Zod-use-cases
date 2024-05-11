import { Api } from "@/components/Api";
import { Form } from "@/components/Form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14 bg-zinc-800">
      <Api />
      <Form />
    </main>
  );
}
