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

// Print date in user locale from ISO date string
const printDate = (date: string) => {
  return (
    new Date(date).toLocaleDateString("sv-SE") +
    " " +
    new Date(date).toLocaleTimeString("sv-SE")
  );
};

const DateItemList = ({
  items,
  sortOrder,
  hide = "none",
}: DateItemListPropsType) => (
  <div className="flex flex-col">
    {items
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
      })
      .map((item) => (
        <div key={item.slug} className="flex flex-col">
          <div className="flex flex-row justify-between">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-sm">{printDate(item.date)}</p>
          </div>
          <Content data={item.body} depth={1} />
        </div>
      ))}
  </div>
);

export default DateItemList;
