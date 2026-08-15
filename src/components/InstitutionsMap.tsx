import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import institutionsData from "@/data/institutions.json";
import { useI18n } from "@/lib/i18n/context";
import type { TranslationKey } from "@/lib/i18n/dictionary";

type InstitutionStatus = "red" | "amber" | "green" | "grey";

type Institution = {
  id: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  status: InstitutionStatus;
  statusLabel: string;
  holdings: string;
  access: string;
  sourceKey: string;
};

const institutions = institutionsData as Institution[];

// Reuses the site's existing tokens rather than introducing new colors:
// destructive/gold/success/ink-muted double as the red/amber/green/grey scale.
const STATUS_COLORS: Record<InstitutionStatus, string> = {
  red: "#8B3A3A",
  amber: "#B8862E",
  green: "#4A6B4D",
  grey: "#6B5D4F",
};

const STATUS_LEGEND_KEYS: Record<InstitutionStatus, TranslationKey> = {
  red: "home.mapLegendRed",
  amber: "home.mapLegendAmber",
  green: "home.mapLegendGreen",
  grey: "home.mapLegendGrey",
};

const STATUS_ORDER: InstitutionStatus[] = ["red", "amber", "green", "grey"];

function markerIcon(status: InstitutionStatus) {
  return L.divIcon({
    className: "",
    html: `<span style="display:block;width:16px;height:16px;border-radius:9999px;background:${STATUS_COLORS[status]};border:2px solid #FAF6EF;box-shadow:0 1px 3px rgba(43,24,16,0.4);"></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -8],
  });
}

export function InstitutionsMap({ className = "" }: { className?: string }) {
  const { t } = useI18n();
  // Leaflet touches window/document at import time, so the map itself is
  // only ever rendered after client-side mount — never during SSR.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className={`relative ${className}`}>
      <div
        style={{ height: 420 }}
        className="overflow-hidden rounded-xl border border-border shadow-frame"
      >
        {mounted ? (
          <MapContainer
            center={[42.5, 21.5]}
            zoom={5}
            scrollWheelZoom={false}
            className="size-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {institutions.map((institution) => (
              <Marker
                key={institution.id}
                position={[institution.lat, institution.lng]}
                icon={markerIcon(institution.status)}
              >
                <Popup>
                  <div className="min-w-[220px]">
                    <p className="font-serif text-base font-semibold text-ink">
                      {institution.name}
                    </p>
                    <p className="mt-0.5 text-[13px] text-ink-muted">
                      {institution.city}, {institution.country}
                    </p>
                    <div className="mt-3 space-y-2">
                      <div>
                        <p className="label-caps">{t("home.mapPopupHoldings")}</p>
                        <p className="mt-1 text-[13px] text-ink">{institution.holdings}</p>
                      </div>
                      <div>
                        <p className="label-caps">{t("home.mapPopupAccess")}</p>
                        <p className="mt-1 text-[13px] text-ink">{institution.access}</p>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <div className="skeleton-thread size-full" />
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 rounded-lg border border-border bg-surface p-3 shadow-card sm:absolute sm:top-4 sm:right-4 sm:mt-0 sm:max-w-[220px] sm:flex-col sm:gap-2">
        {STATUS_ORDER.map((status) => (
          <div key={status} className="flex items-center gap-2 text-[13px] text-ink">
            <span
              aria-hidden
              className="size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: STATUS_COLORS[status] }}
            />
            {t(STATUS_LEGEND_KEYS[status])}
          </div>
        ))}
      </div>
    </div>
  );
}
