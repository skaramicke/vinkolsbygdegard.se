import React from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
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
import NotFound from "./components/NotFound";
import { setSiteDescription } from "./hooks/usePageMeta";

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
  if (eventPageTitle && data.events?.length === 0) {
    filteredPages = filteredPages.filter((p) => p.title !== eventPageTitle);
  }
  if (newsPageTitle && data.news?.length === 0) {
    filteredPages = filteredPages.filter((p) => p.title !== newsPageTitle);
  }
  return filteredPages;
}

const SectionPreviewHeader: React.FC<{ label: string }> = ({ label }) => (
  <div className="ornament-divider mb-8">
    <span className="home-preview-title">{label}</span>
  </div>
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const settings = (data.settings as CmsSettings[])[0];
  const startPageTitle = settings?.startPage;
  const eventPageTitle = settings?.eventsPage;
  const newsPageTitle  = settings?.newsPage;
  const footerData: (CmsText | CmsImage)[] = settings.footer;
  const banner: CmsImage | undefined = settings?.banner;

  if (settings?.description) setSiteDescription(settings.description);

  const startPage = data.pages?.find((p) => p.title === startPageTitle);
  const eventPage = data.pages?.find((p) => p.title === eventPageTitle);
  const newsPage  = data.pages?.find((p) => p.title === newsPageTitle);

  const now = Date.now();
  const upcomingEvents = (data.events ?? [])
    .filter((e) => new Date(e.date).getTime() > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const recentNews = (data.news ?? [])
    .filter((n) => new Date(n.date).getTime() <= now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);

  const homeElement = startPage ? (
    <>
      <Page {...startPage} />

      {upcomingEvents.length > 0 && (
        <section className="home-preview-section">
          <SectionPreviewHeader label="Kommande evenemang" />
          <DateItemList items={upcomingEvents} sortOrder="asc" showIcsDownload />
          {eventPage && (
            <div className="mt-8 text-right">
              <Link to={`/${eventPage.slug}`} className="see-all-link">
                Alla evenemang
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          )}
        </section>
      )}

      {recentNews.length > 0 && (
        <section className="home-preview-section">
          <SectionPreviewHeader label="Senaste nytt" />
          <DateItemList items={recentNews} sortOrder="desc" />
          {newsPage && (
            <div className="mt-8 text-right">
              <Link to={`/${newsPage.slug}`} className="see-all-link">
                Alla nyheter
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          )}
        </section>
      )}
    </>
  ) : null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route
          path="*"
          element={
            <div onClick={() => setIsMenuOpen(false)}>
              <Header
                startPage={startPage}
                pages={filterPages(data.pages || [], eventPageTitle, newsPageTitle)}
                banner={banner}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
              />
              <main className="container mx-auto max-w-screen-lg px-5 md:px-10 lg:px-14 py-10 md:py-14">
                <div className="max-w-4xl mx-auto">
                  <Routes>
                    {startPage && (
                      <Route path="/" element={homeElement} />
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
                                    showIcsDownload
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
                              image={news.thumbnail ?? undefined}
                            />
                          }
                        />
                      ))}
                    <Route path="*" element={<NotFound />} />
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
