export default function Loading() {
  return (
    <main aria-busy="true">
      <div className="hero-emergency h-72" />
      <div className="page-container grid gap-4 py-9 [grid-template-columns:repeat(auto-fill,minmax(340px,1fr))]">
        {Array.from({ length: 6 }, (_, i) => (
          <div className="skeleton h-[164px]" key={i} />
        ))}
      </div>
    </main>
  );
}
