import { Link } from "react-router-dom";
import { CmsImage, CmsPage } from "../types/cms";
import { useState } from "react";

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

const Header = ({
  banner,
  startPage,
  pages,
  isMenuOpen,
  setIsMenuOpen,
}: HeaderProps) => {
  return (
    <header className="container mx-auto max-w-screen-lg bg-light-secondary dark:bg-dark-secondary">
      {banner && (
        <div className="flex items-center justify-center mb-5">
          <img src={banner.image} alt={banner.alt} className="w-full" />
        </div>
      )}
      <nav className="px-8 xl:px-5 pb-5 lb:py-8">
        <div className="md:hidden flex justify-between items-center">
          {startPage && (
            <>
              <dialog
                open={isMenuOpen}
                className="fixed top-0 start-0 end-0 bottom-0 w-full h-full backdrop-blur"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              >
                <div className="flex flex-col items-center justify-center bg-light-secondary dark:bg-dark-secondary">
                  {startPage && (
                    <Link
                      to="/"
                      className="px-5 py-2 text-lg font-medium text-light-text dark:text-dark-text hover:text-light-accent dark:hover:text-dark-accent"
                    >
                      Hem
                    </Link>
                  )}
                  {pages &&
                    pages
                      .filter((p) => pageListedInMenu(p, startPage))
                      .sort((a, b) => a.order - b.order)
                      .map((page) => (
                        <Link
                          key={page.slug}
                          to={`/${page.slug}`}
                          className="px-5 py-2 text-lg font-medium text-light-text dark:text-dark-text hover:text-light-accent dark:hover:text-dark-accent"
                        >
                          {page.title}
                        </Link>
                      ))}
                </div>
              </dialog>
              <Link
                key={startPage.slug}
                to="/"
                className="text-sm font-medium text-light-text dark:text-dark-text hover:text-light-accent dark:hover:text-dark-accent"
              >
                Hem
              </Link>
              <button
                aria-label="Toggle Menu"
                className="ml-auto rounded-md px-2 py-1 text-light-text focus:text-light-accent dark:text-dark-text focus:outline-none md:hidden"
                id="headlessui-disclosure-button-:r0:"
                type="button"
                aria-expanded="false"
                data-headlessui-state=""
                onClick={(e) => {
                  setIsMenuOpen(true);
                  e.stopPropagation();
                }}
              >
                <svg
                  className="h-6 w-6 fill-light-text dark:fill-dark-text"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  ></path>
                </svg>
              </button>
            </>
          )}
        </div>
        <div className="hidden md:flex justify-between items-center gap-1">
          {startPage && (
            <Link
              to="/"
              className="text-sm font-medium text-light-text dark:text-dark-text hover:text-light-accent dark:hover:text-dark-accent"
            >
              {startPage.title}
            </Link>
          )}
          {pages &&
            pages
              .filter((p) => pageListedInMenu(p, startPage))
              .sort((a, b) => a.order - b.order)
              .map((page) => (
                <Link
                  key={page.slug}
                  to={`/${page.slug}`}
                  className="text-sm font-medium text-light-text dark:text-dark-text hover:text-light-accent dark:hover:text-dark-accent"
                >
                  {page.title}
                </Link>
              ))}
        </div>

        {/* <div className="flex flex-wrap justify-between md:flex-nowrap md:gap-10">
        <div className="flex w-full items-center justify-between md:w-auto">
          {startPage && (
            <Link
              key={startPage.slug}
              to="/"
              className="text-sm font-medium text-light-text dark:text-dark-text hover:text-light-accent dark:hover:text-dark-accent"
            >
              {startPage.title}
            </Link>
          )}
          <button
            aria-label="Toggle Menu"
            className="ml-auto rounded-md px-2 py-1 text-gray-500 focus:text-accent focus:outline-none md:hidden"
            id="headlessui-disclosure-button-:r0:"
            type="button"
            aria-expanded="false"
            data-headlessui-state=""
          >
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="order-2 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row">
          {pages &&
            pages
              .filter((p) => pageListedInMenu(p, startPage))
              .sort((a, b) => a.order - b.order)
              .map((page) => (
                <Link
                  key={page.slug}
                  to={`/${page.slug}`}
                  className="px-5 py-2 text-sm font-medium text-light-text dark:text-dark-text hover:text-light-accent dark:hover:text-dark-accent"
                >
                  {page.title}
                </Link>
              ))}
        </div>
      </div> */}
      </nav>
    </header>
  );
};

export default Header;
