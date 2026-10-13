import FormField from "@/components/blood/FormField";

type Props = { id: string; value: string; error?: string; onChange: (value: string) => void };

/** Mobile number field with the fixed +৮৮ prefix. */
export default function PhoneInput({ id, value, error, onChange }: Props) {
  return (
    <FormField error={error} htmlFor={id} label="মোবাইল নম্বর">
      <div className="flex gap-2">
        <span className="grid h-11 shrink-0 place-items-center rounded-[10px] border border-slate-300 bg-slate-50 px-3.5 text-sm text-slate-600">+৮৮</span>
        <input autoComplete="tel-national" className="field" id={id} inputMode="tel" onChange={(e) => onChange(e.target.value)} placeholder="০১XXXXXXXXX" type="tel" value={value} />
      </div>
    </FormField>
  );
}
