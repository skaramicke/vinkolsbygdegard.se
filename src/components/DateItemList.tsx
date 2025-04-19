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

const printDate = (date: string, endDate?: string) => {
  const dateObj = new Date(date);
  const currentYear = new Date().getFullYear();
  const year = dateObj.getFullYear();

  // Format time as HH:mm
  const time = dateObj.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Format date based on whether it's current year
  const dateStr =
    year === currentYear
      ? dateObj.toLocaleDateString("sv-SE", {
          day: "2-digit",
          month: "2-digit",
        })
      : dateObj.toLocaleDateString("sv-SE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

  let result = `${dateStr} ${time}`;

  // Add end time if it exists
  if (endDate) {
    const endDateObj = new Date(endDate);
    const endTime = endDateObj.toLocaleTimeString("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
    });
    result += ` - ${endTime}`;
  }

  return result;
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
              <p className="text-sm text-gray-600">
                {printDate(
                  item.date,
                  "endDate" in item ? item.endDate : undefined
                )}
              </p>
            </div>
            <Content data={item.body} depth={1} />
          </div>
        </div>
      ))}
  </div>
);

export default DateItemList;
