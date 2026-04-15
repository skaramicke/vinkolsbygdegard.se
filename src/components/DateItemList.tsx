import React from "react";
import { CmsEvent, CmsNewsArticle } from "../types/cms";
import Content from "./Content";

type SortOrderType = "asc" | "desc";
type hideByTimeType = "none" | "past" | "future";

type DateItemListPropsType = {
  items: (CmsEvent | CmsNewsArticle)[];
  sortOrder?: SortOrderType;
  hide?: hideByTimeType;
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
                {item.thumbnail && (
                  <div className="event-thumb mb-3 -mt-1 border border-light-stone/60 overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-40 md:h-48 object-cover object-center"
                    />
                  </div>
                )}
                <h2 className="section-heading text-2xl md:text-3xl text-light-text leading-tight">
                  {item.title}
                </h2>
                <div className="rule-fade my-3" />
                <div className="prose-vbg">
                  <Content data={item.body} depth={1} />
                </div>
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
