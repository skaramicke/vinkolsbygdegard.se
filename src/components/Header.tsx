import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CmsImage, CmsPage } from "../types/cms";

const pageListedInMenu = (page: CmsPage, startPage?: CmsPage) => {
  if (startPage && page.title === startPage.title) return false;
  return page.showInMenu;
};

type HeaderProps = {
  banner?: CmsImage;
  startPage?: CmsPage;
  eventsPageTitle?: string;
  newsPageTitle?: string;
  pages?: CmsPage[];
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
};

const GUTTER = "px-5 md:px-10 lg:px-14";

const Header = ({
  banner,
  startPage,
  pages,
  isMenuOpen,
  setIsMenuOpen,
}: HeaderProps) => {
  const location = useLocation();
  const orderedPages = (pages ?? [])
    .filter((p) => pageListedInMenu(p, startPage))
    .sort((a, b) => a.order - b.order);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isMenuOpen, setIsMenuOpen]);

  const currentPath = location.pathname;

  return (
    <header className="relative">
      {/* Identity bar — Falun red, full width */}
      <div className="identity-bar">
        <div className={`container mx-auto max-w-screen-lg ${GUTTER} py-2 flex items-center justify-between`}>
          <span>Vinköls Bygdegårdsförening</span>
          <span className="hidden sm:inline">Sedan 1923 · Vinköl, Skara</span>
          <a href="tel:+46760402986" className="hover:text-white transition-colors">076-040 29 86</a>
        </div>
      </div>

      <div className={`container mx-auto max-w-screen-lg ${GUTTER} pt-6 md:pt-10 pb-5 md:pb-7`}>
        <div className="flex items-center justify-center gap-3 text-light-gold opacity-70">
          <span className="h-px w-16 bg-current" />
          <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden>
            <path d="M8 1 L9.6 6.4 L15 8 L9.6 9.6 L8 15 L6.4 9.6 L1 8 L6.4 6.4 Z" fill="currentColor"/>
          </svg>
          <span className="h-px w-16 bg-current" />
        </div>

        <Link
          to="/"
          className="block text-center mt-4 md:mt-5"
          aria-label="Till startsidan"
        >
          <div className="masthead-eyebrow text-light-primary mb-2 md:mb-3">
            Vinköls
          </div>
          <h1 className="masthead-title text-light-text text-[2.6rem] leading-[0.95] sm:text-6xl md:text-7xl">
            Bygdegårds<span className="italic font-normal">förening</span>
          </h1>
        </Link>
      </div>

      {banner && (
        <div className={`container mx-auto max-w-screen-lg ${GUTTER}`}>
          <div className="banner-frame border border-light-stone/60 shadow-paper overflow-hidden">
            <img
              src={banner.image}
              alt={banner.alt}
              className="w-full block aspect-[3/2] sm:aspect-[2/1] md:aspect-[16/7] object-cover"
            />
          </div>
        </div>
      )}

      <nav className={`menu-band mt-5 md:mt-8`} aria-label="Huvudmeny">
        <div className={`container mx-auto max-w-screen-lg ${GUTTER} py-3 md:py-4`}>
          <div className="hidden md:flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            {startPage && (
              <Link
                to="/"
                aria-current={currentPath === "/" ? "page" : undefined}
                className="nav-link px-4"
              >
                {startPage.title}
              </Link>
            )}
            {orderedPages.map((page) => (
              <React.Fragment key={page.slug}>
                <span className="menu-separator" aria-hidden>
                  ◆
                </span>
                <Link
                  to={`/${page.slug}`}
                  aria-current={
                    currentPath === `/${page.slug}` ? "page" : undefined
                  }
                  className="nav-link px-4"
                >
                  {page.title}
                </Link>
              </React.Fragment>
            ))}
          </div>

          <div className="md:hidden flex items-center justify-between">
            <Link
              to="/"
              aria-current={currentPath === "/" ? "page" : undefined}
              className="nav-link"
            >
              {startPage?.title ?? "Hem"}
            </Link>
            <button
              aria-label="Öppna meny"
              type="button"
              aria-expanded={isMenuOpen}
              className="group flex items-center gap-2 px-3 py-1.5"
              onClick={(e) => {
                setIsMenuOpen(true);
                e.stopPropagation();
              }}
            >
              <span className="nav-link !text-light-primary">Meny</span>
              <span className="flex flex-col gap-[3px]">
                <span className="block w-4 h-px bg-light-primary" />
                <span className="block w-4 h-px bg-light-primary" />
                <span className="block w-4 h-px bg-light-primary" />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          style={{ backgroundColor: "rgba(9,23,51,0.55)", backdropFilter: "blur(4px)" }}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="absolute top-0 right-0 bottom-0 w-[82%] max-w-[22rem] bg-light-background shadow-paper flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-light-stone/60">
              <span className="masthead-eyebrow text-light-primary">
                Meny
              </span>
              <button
                aria-label="Stäng meny"
                className="masthead-eyebrow text-light-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                Stäng ✕
              </button>
            </div>
            <div className="px-6 py-4 flex-1 overflow-y-auto">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="drawer-link border-b border-light-stone/40"
              >
                {startPage?.title ?? "Hem"}
              </Link>
              {orderedPages.map((page) => (
                <Link
                  key={page.slug}
                  to={`/${page.slug}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="drawer-link border-b border-light-stone/40"
                >
                  {page.title}
                </Link>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-light-stone/60 bg-light-paper/50">
              <div className="ornament-divider text-light-gold mb-2">
                <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden>
                  <path
                    d="M7 0 L8.4 5.6 L14 7 L8.4 8.4 L7 14 L5.6 8.4 L0 7 L5.6 5.6 Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <p className="text-center font-display italic text-sm text-light-muted">
                Sedan 1923 · Vinköl, Skara
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
