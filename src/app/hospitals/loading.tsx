export default function Loading() {
  return (
    <main aria-busy="true">
      <div className="hero-gradient h-60" />
      <div className="page-container grid gap-4 py-9 [grid-template-columns:repeat(auto-fill,minmax(330px,1fr))]">
        {Array.from({ length: 6 }, (_, i) => (
          <div className="skeleton h-[196px]" key={i} />
        ))}
      </div>
    </main>
  );
}
