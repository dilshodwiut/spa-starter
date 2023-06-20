import "@/lib/to-capital-case";

export default function Root(): React.ReactElement {
  const mention = "spa starter".toCapitalCase();

  return (
    <>
      <div>Root element</div>
      <footer>{mention}</footer>
    </>
  );
}
