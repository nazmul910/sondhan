export type LegalSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  list?: string[];
  cta?: { label: string; href: string };
};
