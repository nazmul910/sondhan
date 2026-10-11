export default function Loading() {
  return (
    <main aria-busy="true">
      <div className="hero-blood h-72" />
      <div className="page-container grid gap-4 py-9 [grid-template-columns:repeat(auto-fill,minmax(310px,1fr))]">
        {Array.from({ length: 6 }, (_, i) => (
          <div className="skeleton h-[100px]" key={i} />
        ))}
      </div>
    </main>
  );
}
