import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "যোগাযোগ | Shondhan",
  description: "প্রশ্ন, মতামত বা সমস্যা জানাতে Shondhan টিমের সাথে যোগাযোগ করুন।",
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        accent="যোগাযোগ করুন"
        crumbs={[{ label: "হোম", href: "/" }, { label: "যোগাযোগ" }]}
        description="প্রশ্ন, মতামত বা সমস্যা — আমরা শুনতে চাই।"
        title="আমাদের সাথে"
      />

      <div className="page-container py-9 pb-16 lg:flex lg:items-start lg:gap-6">
        <section aria-label="যোগাযোগ ফর্ম" className="min-w-0 flex-1">
          <ContactForm />
        </section>

        <aside aria-label="যোগাযোগের তথ্য" className="mt-6 lg:mt-0 lg:w-[340px] lg:shrink-0">
          <ContactInfo />
        </aside>
      </div>
    </main>
  );
}
