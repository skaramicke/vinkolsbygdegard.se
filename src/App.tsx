import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./Admin";
import Page from "./components/Page";
import {
  CmsEvent,
  CmsImage,
  CmsNewsArticle,
  CmsPage,
  CmsSettings,
  CmsText,
} from "./types/cms";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DateItemList from "./components/DateItemList";

interface Data {
  pages?: CmsPage[];
  events?: CmsEvent[];
  news?: CmsNewsArticle[];
  settings?: CmsSettings[];
}

const data: Data = require("./data.json");

function filterPages(
  pages: CmsPage[],
  eventPageTitle?: string,
  newsPageTitle?: string
) {
  let filteredPages = pages;
  // If event page title is set, but data.events is empty, remove the event page from the menu
  if (eventPageTitle && data.events?.length === 0) {
    filteredPages = filteredPages.filter((p) => p.title !== eventPageTitle);
  }
  // If news page title is set, but data.news is empty, remove the news page from the menu
  if (newsPageTitle && data.news?.length === 0) {
    filteredPages = filteredPages.filter((p) => p.title !== newsPageTitle);
  }
  return filteredPages;
}

function App() {
  const startPageTitle: string | undefined = (data.settings as CmsSettings[])[0]
    ?.startPage;
  let startPage: CmsPage | undefined;

  if (startPageTitle) {
    startPage = data.pages?.find((page) => page.title === startPageTitle);
  }

  const eventPageTitle: string | undefined = (data.settings as CmsSettings[])[0]
    ?.eventsPage;

  const newsPageTitle: string | undefined = (data.settings as CmsSettings[])[0]
    ?.newsPage;

  const footerData: (CmsText | CmsImage)[] = (data.settings as CmsSettings[])[0]
    .footer;

  const banner: CmsImage | undefined = (data.settings as CmsSettings[])[0]
    ?.banner;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route
          path="*"
          element={
            <div>
              <Header
                startPage={startPage}
                pages={filterPages(
                  data.pages || [],
                  eventPageTitle,
                  newsPageTitle
                )}
                banner={banner}
              />
              <main className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8 border-l border-r">
                <div className="max-w-2x1 mx-auto">
                  <Routes>
                    {startPage && (
                      <Route path="/" element={<Page {...startPage} />} />
                    )}
                    {data.pages &&
                      data.pages.map((page) => (
                        <Route
                          key={page.slug}
                          path={`/${page.slug}`}
                          element={
                            <Page title={page.title} body={page.body}>
                              {eventPageTitle &&
                                page.title === eventPageTitle &&
                                data.events && (
                                  <DateItemList
                                    items={data.events}
                                    sortOrder="asc"
                                    hide="past"
                                  />
                                )}
                              {newsPageTitle &&
                                page.title === newsPageTitle &&
                                data.news && (
                                  <DateItemList
                                    items={data.news}
                                    hide="future"
                                  />
                                )}
                            </Page>
                          }
                        />
                      ))}
                    {data.news &&
                      data.news.map((news) => (
                        <Route
                          key={news.slug}
                          path={`/nyheter/${news.slug}`}
                          element={
                            <Page
                              title={news.title}
                              subtitle={news.date}
                              body={news.body}
                            />
                          }
                        />
                      ))}
                    {/* 404 page */}
                    <Route path="*" element={<h1>404</h1>} />
                  </Routes>
                </div>
              </main>
              <Footer items={footerData} />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
