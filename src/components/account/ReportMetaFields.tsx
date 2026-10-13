import FormField from "@/components/blood/FormField";
import { REPORT_TYPE_KEYS, REPORT_TYPES } from "@/data/account";
import type { DraftErrors } from "@/lib/reports";
import type { ReportDraft, ReportType } from "@/types/account";

type Props = {
  draft: ReportDraft;
  errors: DraftErrors;
  onChange: (patch: Partial<ReportDraft>) => void;
  /** Unique per form so label/id pairs never clash (upload page vs edit modal). */
  idPrefix: string;
  /** The edit modal lets people rename a report; the upload form derives the title from the type. */
  showTitle?: boolean;
};

/** Fields shared by the upload form and the edit modal. */
export default function ReportMetaFields({ draft, errors, onChange, idPrefix, showTitle = false }: Props) {
  return (
    <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
      {showTitle && (
        <div className="sm:col-span-2">
          <FormField error={errors.title} htmlFor={`${idPrefix}-title`} label="শিরোনাম">
            <input className="field" id={`${idPrefix}-title`} onChange={(e) => onChange({ title: e.target.value })} placeholder="যেমন: ব্লাড টেস্ট রিপোর্ট" type="text" value={draft.title} />
          </FormField>
        </div>
      )}

      <FormField htmlFor={`${idPrefix}-type`} label="রিপোর্টের ধরন">
        <select className="field font-semibold" id={`${idPrefix}-type`} onChange={(e) => onChange({ type: e.target.value as ReportType })} value={draft.type}>
          {REPORT_TYPE_KEYS.map((key) => (
            <option key={key} value={key}>
              {REPORT_TYPES[key].label}
            </option>
          ))}
        </select>
      </FormField>

      <FormField error={errors.date} htmlFor={`${idPrefix}-date`} label="রিপোর্টের তারিখ">
        <input className="field" id={`${idPrefix}-date`} onChange={(e) => onChange({ date: e.target.value })} type="date" value={draft.date} />
      </FormField>

      <FormField error={errors.provider} htmlFor={`${idPrefix}-provider`} label="হাসপাতাল / ল্যাব">
        <input className="field" id={`${idPrefix}-provider`} onChange={(e) => onChange({ provider: e.target.value })} placeholder="প্রতিষ্ঠানের নাম" type="text" value={draft.provider} />
      </FormField>

      <FormField htmlFor={`${idPrefix}-doctor`} label="ডাক্তারের নাম (ঐচ্ছিক)">
        <input className="field" id={`${idPrefix}-doctor`} onChange={(e) => onChange({ doctor: e.target.value })} placeholder="ডাক্তারের নাম" type="text" value={draft.doctor} />
      </FormField>

      <div className="sm:col-span-2">
        <FormField htmlFor={`${idPrefix}-note`} label="নোট (ঐচ্ছিক)">
          <textarea
            className="field h-auto min-h-28 resize-y py-3 leading-6"
            id={`${idPrefix}-note`}
            onChange={(e) => onChange({ note: e.target.value })}
            placeholder="রিপোর্ট সম্পর্কে কিছু লিখে রাখুন..."
            rows={3}
            value={draft.note}
          />
        </FormField>
      </div>
    </div>
  );
}
