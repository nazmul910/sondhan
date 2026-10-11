import { Search } from "lucide-react";
import DivisionSelect from "@/components/layout/DivisionSelect";

type Props = {
  /** Page the form submits to, e.g. "/doctors". Plain GET form: no client JS needed. */
  action: string;
  placeholder: string;
  defaultQuery?: string;
};

export default function SearchBar({ action, placeholder, defaultQuery = "" }: Props) {
  return (
    <form
      action={action}
      className="flex w-full max-w-[720px] items-center gap-3 rounded-2xl border border-slate-200/90 bg-white p-1.5 pl-4 shadow-[0_12px_30px_rgba(23,33,59,0.09)] max-sm:grid max-sm:grid-cols-[minmax(0,1fr)_auto] max-sm:gap-2 max-sm:p-2"
      role="search"
    >
      <label className="flex min-w-0 flex-1 items-center gap-3 max-sm:col-span-2 max-sm:min-h-11 max-sm:border-b max-sm:border-slate-100 max-sm:px-1.5">
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
      <span aria-hidden="true" className="h-7 w-px shrink-0 bg-slate-200 max-sm:hidden" />
      <DivisionSelect className="h-11 w-[118px] shrink-0 text-sm max-sm:h-10 max-sm:w-[112px] max-sm:px-2 max-sm:text-xs" name="division" />
      <button className="btn-primary h-11 min-w-[112px] shadow-sm max-sm:h-10 max-sm:min-w-[104px]" type="submit">
        <Search aria-hidden="true" className="size-[18px]" />
        খুঁজুন
      </button>
    </form>
  );
}
