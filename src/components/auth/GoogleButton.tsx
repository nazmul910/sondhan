/** TODO(backend): hook up Google sign-in. */
export default function GoogleButton() {
  return (
    <button
      className="flex min-h-11 w-full cursor-pointer items-center justify-center gap-2.5 rounded-[10px] border border-slate-300 bg-white text-sm font-semibold text-slate-700 transition hover:border-primary hover:bg-slate-50"
      type="button"
    >
      <span aria-hidden="true" className="grid size-5 place-items-center rounded-full border-2 border-primary text-[11px] font-bold text-primary-dark">
        G
      </span>
      Google দিয়ে চালিয়ে যান
    </button>
  );
}
