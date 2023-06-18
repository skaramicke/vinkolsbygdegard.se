import React from "react";
import ReactMarkdown from "react-markdown";

export interface TextBlockProps {
  type: "text";
  heading?: string;
  body: string; // Markdown
}

const TextBlock = (props: TextBlockProps) => (
  <div>
    {props.heading && <h1>{props.heading}</h1>}
    <ReactMarkdown>{props.body}</ReactMarkdown>
  </div>
);

export default TextBlock;
