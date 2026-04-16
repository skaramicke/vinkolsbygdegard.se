import React from "react";
import { CmsEvent, CmsNewsArticle } from "../types/cms";
import Content from "./Content";
import CategoryThumbnail, { EventCategory } from "./CategoryThumbnail";
import { icsDataUrl } from "../utils/ics";

type SortOrderType = "asc" | "desc";
type hideByTimeType = "none" | "past" | "future";

type DateItemListPropsType = {
  items: (CmsEvent | CmsNewsArticle)[];
  sortOrder?: SortOrderType;
  hide?: hideByTimeType;
  showIcsDownload?: boolean;
};

const MONTHS_SV = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAJ",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OKT",
  "NOV",
  "DEC",
];

const WEEKDAYS_SV = [
  "söndag",
  "måndag",
  "tisdag",
  "onsdag",
  "torsdag",
  "fredag",
  "lördag",
];

const formatTime = (d: Date) =>
  d.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });

const timeRange = (date: string, endDate?: string): string => {
  const d = new Date(date);
  if (!endDate) return `kl ${formatTime(d)}`;
  const e = new Date(endDate);
  const sameDay =
    d.getFullYear() === e.getFullYear() &&
    d.getMonth() === e.getMonth() &&
    d.getDate() === e.getDate();
  if (sameDay) return `kl ${formatTime(d)}–${formatTime(e)}`;
  return `kl ${formatTime(d)}`;
};

const Almanacka: React.FC<{
  date: string;
  endDate?: string;
}> = ({ date, endDate }) => {
  const d = new Date(date);
  const sameDayEnd =
    endDate &&
    (() => {
      const e = new Date(endDate);
      return (
        d.getFullYear() === e.getFullYear() &&
        d.getMonth() === e.getMonth() &&
        d.getDate() === e.getDate()
      );
    })();

  return (
    <div
      className="almanacka shrink-0"
      aria-label={`${d.getDate()} ${MONTHS_SV[d.getMonth()]} ${d.getFullYear()}`}
    >
      <span className="month">{MONTHS_SV[d.getMonth()]}</span>
      <span className="day">{d.getDate().toString().padStart(2, "0")}</span>
      <span className="weekday">{WEEKDAYS_SV[d.getDay()]}</span>
      {!endDate || sameDayEnd ? null : (
        <span className="weekday text-[0.65rem] mt-0.5 opacity-80">
          – {new Date(endDate).getDate()}/
          {new Date(endDate).getMonth() + 1}
        </span>
      )}
    </div>
  );
};

const yearOf = (d: Date) => d.getFullYear();

const DateItemList = ({
  items,
  sortOrder,
  hide = "none",
  showIcsDownload = false,
}: DateItemListPropsType) => {
  const filtered = items
    .slice()
    .sort((a, b) => {
      switch (sortOrder) {
        case "asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "desc":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    })
    .filter((item) => {
      switch (hide) {
        case "past":
          return new Date(item.date).getTime() > Date.now();
        case "future":
          return new Date(item.date).getTime() < Date.now();
        case "none":
        default:
          return true;
      }
    });

  let lastYear: number | null = null;

  return (
    <div className="flex flex-col gap-6 mt-2">
      {filtered.map((item) => {
        const d = new Date(item.date);
        const showYearMarker = yearOf(d) !== lastYear;
        lastYear = yearOf(d);
        const endDate = "endDate" in item && item.endDate ? item.endDate : undefined;

        return (
          <React.Fragment key={item.slug}>
            {showYearMarker && (
              <div className="ornament-divider mt-2">
                <span className="masthead-eyebrow text-light-muted">
                  {yearOf(d)}
                </span>
              </div>
            )}
            <article className="paper-card relative grid grid-cols-[auto,1fr] gap-5 md:gap-7 p-4 md:p-6">
              <div className="pt-1">
                <Almanacka date={item.date} endDate={endDate} />
                <div className="mt-3 text-center text-[0.7rem] tracking-[0.2em] uppercase text-light-muted">
                  {timeRange(item.date, endDate)}
                </div>
              </div>
              <div className="min-w-0 relative z-10">
                {item.thumbnail ? (
                  <div className="event-thumb mb-3 -mt-1 border border-light-stone/60 overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-40 md:h-48 object-cover object-center"
                    />
                  </div>
                ) : "category" in item && item.category ? (
                  <div className="event-thumb mb-3 -mt-1 border border-light-stone/60 overflow-hidden">
                    <CategoryThumbnail category={item.category as EventCategory} />
                  </div>
                ) : null}
                <h2 className="section-heading text-2xl md:text-3xl text-light-text leading-tight">
                  {item.title}
                </h2>
                <div className="rule-fade my-3" />
                <div className="prose-vbg">
                  <Content data={item.body} depth={1} />
                </div>
                {"organizerName" in item && item.organizerName && (
                  <div className="mt-3 pt-3 border-t border-light-stone/40 text-sm text-light-muted">
                    <span className="font-semibold tracking-wide uppercase text-xs mr-2">Arrangör:</span>
                    {item.organizerPhone ? (
                      <a
                        href={`tel:${item.organizerPhone}`}
                        className="hover:text-light-text transition-colors"
                      >
                        {item.organizerName}
                      </a>
                    ) : (
                      <span>{item.organizerName}</span>
                    )}
                    {item.organizerPhone && (
                      <span className="ml-2 opacity-70">
                        <a href={`tel:${item.organizerPhone}`} className="hover:text-light-text transition-colors">
                          {item.organizerPhone}
                        </a>
                      </span>
                    )}
                  </div>
                )}
                {showIcsDownload && (
                  <div className="mt-3 pt-3 border-t border-light-stone/40 flex justify-end">
                    <a
                      href={icsDataUrl(item as CmsEvent)}
                      download={`${item.slug}.ics`}
                      className="ics-download-link"
                      aria-label={`Lägg till ${item.title} i kalendern`}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="shrink-0">
                        <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                        <path d="M1 5h10" stroke="currentColor" strokeWidth="1.2"/>
                        <path d="M4 1v2M8 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                      Lägg i kalender
                    </a>
                  </div>
                )}
              </div>
            </article>
          </React.Fragment>
        );
      })}
      {filtered.length === 0 && (
        <p className="font-display italic text-light-muted text-lg text-center py-6">
          Inga händelser att visa just nu.
        </p>
      )}
    </div>
  );
};

export default DateItemList;
