import CodeEditor from "@/components/CodeEditor";

export default async function DynamicCode({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CodeEditor docId={id}/>;
}
