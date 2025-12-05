import FormUI from "./FormUI";

export default async function FormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ FIX: Next.js dynamic routes give params as a Promise
  const { id } = await params;

  // Fetch the correct JSON form schema
  const res = await fetch(`http://localhost:3000/api/forms/${id}`, {
    cache: "no-store",
  });

  const data = await res.json();

  return <FormUI form={data} />;
}
