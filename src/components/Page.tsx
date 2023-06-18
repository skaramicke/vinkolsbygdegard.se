import React from "react";
import Content, { ContentData } from "./Content";

interface PageProps {
  content: {
    title: string;
    body: ContentData;
  };
}

const Page = (props: PageProps) => (
  <div>
    <h1>{props.content.title}</h1>
    <Content data={props.content.body} />
  </div>
);

export default Page;
