import { Search } from "lucide-react";

type Props = { action: string; placeholder: string; defaultQuery?: string; category?: string | null };

/** Plain GET form: no client JS needed. Keeps the selected category when searching. */
export default function TipSearchBar({ action, placeholder, defaultQuery = "", category }: Props) {
  return (
    <form
      action={action}
      className="flex w-full max-w-[720px] items-center gap-3 rounded-2xl border border-slate-200/90 bg-white p-1.5 pl-4 shadow-[0_12px_30px_rgba(23,33,59,0.09)] max-sm:p-2"
      role="search"
    >
      <label className="flex min-w-0 flex-1 items-center gap-3">
        <Search aria-hidden="true" className="size-[22px] shrink-0 text-slate-500" />
        <input
          aria-label={placeholder}
          className="min-w-0 flex-1 bg-transparent text-sm text-heading outline-none placeholder:text-slate-400 max-sm:text-xs"
          defaultValue={defaultQuery}
          name="q"
          placeholder={placeholder}
          type="search"
        />
      </label>
      {category && <input name="category" type="hidden" value={category} />}
      <button className="btn-primary h-11 min-w-[112px] shadow-sm max-sm:h-10 max-sm:min-w-[92px]" type="submit">
        <Search aria-hidden="true" className="size-[18px]" />
        খুঁজুন
      </button>
    </form>
  );
}
