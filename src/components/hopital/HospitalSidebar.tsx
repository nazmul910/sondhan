import Link from "next/link";
import { MapPin, Phone, Navigation, ExternalLink } from "lucide-react";
import CallButton from "@/components/shared/CallButton";

interface HospitalSidebarProps {
  hospital: {
    name?: string;
    address: string;
    phone?: string | null;
    away?: string | null;
  };
}

export default function HospitalSidebar({ hospital }: HospitalSidebarProps) {
  // Build OpenStreetMap embed URL using address as search query
  const searchQuery = encodeURIComponent(
    hospital.name ? `${hospital.name}, ${hospital.address}` : hospital.address
  );
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=auto&layer=mapnik&marker=&query=${searchQuery}#map=15`;
  const osmSearchUrl = `https://www.openstreetmap.org/search?query=${searchQuery}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;

  return (
    <div className="flex flex-col gap-4">
      <section className="card overflow-hidden p-0">
        {/* Map iframe */}
        <div className="relative h-52 w-full overflow-hidden rounded-t-2xl bg-slate-100">
          <iframe
            title="হাসপাতালের অবস্থান"
            src={osmEmbedUrl}
            width="100%"
            height="100%"
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        </div>

        {/* Address + links below map */}
        <div className="flex flex-col gap-2 p-4">
          <p className="flex items-start gap-2 text-[13px] leading-6 text-slate-600">
            <MapPin aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-primary" />
            <span>{hospital.address}</span>
          </p>

          {hospital.away && (
            <p className="flex items-center gap-1.5 text-[13px] font-medium text-primary-dark">
              <Navigation aria-hidden="true" className="size-3.5 shrink-0 text-primary" />
              আপনার অবস্থান থেকে {hospital.away} দূরে
            </p>
          )}

          <div className="mt-1 flex gap-2">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline flex-1 text-center text-xs"
            >
              <ExternalLink className="size-3.5" />
              Google Maps
            </a>
            <a
              href={osmSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline flex-1 text-center text-xs"
            >
              <ExternalLink className="size-3.5" />
              OpenStreetMap
            </a>
          </div>
        </div>
      </section>

      {hospital.phone && (
        <section className="card p-5">
          <strong className="text-base text-heading">যোগাযোগ</strong>
          <div className="mt-3">
            <CallButton label={hospital.phone} phone={hospital.phone} />
          </div>
        </section>
      )}

      <section className="rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 p-5">
        <strong className="text-base text-red-700">জরুরি অ্যাম্বুলেন্স দরকার?</strong>
        <p className="mb-3.5 mt-1.5 text-[13px] leading-6 text-slate-600">
          এই হাসপাতালে যেতে দ্রুত অ্যাম্বুলেন্স ডাকুন।
        </p>
        <Link className="btn-danger w-full min-h-11" href="/ambulance">
          <Phone aria-hidden="true" className="size-4" />
          অ্যাম্বুলেন্স দেখুন
        </Link>
      </section>
    </div>
  );
}

