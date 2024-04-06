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
  <div className="flex flex-col space-y-4">
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
        <div
          key={item.slug}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          {item.thumbnail && (
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-48 object-cover object-center"
            />
          )}
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>
              <p className="text-sm text-gray-600">{printDate(item.date)}</p>
            </div>
            <Content data={item.body} depth={1} />
          </div>
        </div>
      ))}
  </div>
);

export default DateItemList;
