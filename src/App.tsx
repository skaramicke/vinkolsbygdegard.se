import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./Admin";
import Home from "./components/Home";
import Page from "./components/Page";
import News from "./components/News";
import { ContentData } from "./components/Content";

interface Data {
  pages: {
    slug: string;
    title: string;
    body: ContentData;
  }[];
  news: {
    slug: string;
    title: string;
    date: string;
    body: ContentData;
  }[];
}
const data: Data = require("./data.json");

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/"
          element={<Home title="Vinköls Bygdegård" body="Välkommen!" />}
        />
        {data.pages.map((page) => (
          <Route
            key={page.slug}
            path={`/${page.slug}`}
            element={<Page content={page} />}
          />
        ))}
        {data.news.map((news) => (
          <Route
            key={news.slug}
            path={`/nyheter/${news.slug}`}
            element={<News item={news} />}
          />
        ))}
        {/* 404 page */}
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
