import React from "react";
import Content, { ContentData } from "./Content";

interface NewsProps {
  item: {
    slug: string;
    title: string;
    body: ContentData;
  };
}

const News = (props: NewsProps) => {
  return (
    <div>
      <h1>{props.item.title}</h1>
      <Content data={props.item.body} />
    </div>
  );
};

export default News;
