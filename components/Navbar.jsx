"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const checkUser = () => {
      const user = localStorage.getItem("loggedInUser");
      setIsLoggedIn(!!user);
    };

    checkUser();

    window.addEventListener("login", checkUser);
    window.addEventListener("logout", checkUser);

    return () => {
      window.removeEventListener("login", checkUser);
      window.removeEventListener("logout", checkUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    window.dispatchEvent(new Event("logout"));
    setIsLoggedIn(false);
    setNavOpen(false);
    router.push("/auth/login");
  };

  const handleLinkClick = () => {
    setNavOpen(false);
  };

  return (
    <nav className="fixed z-50 w-full bg-white md:absolute md:bg-transparent">
      <div className="container m-auto px-2 md:px-12 lg:px-7">
        <div className="flex flex-wrap items-center justify-between py-3 gap-6 md:py-4 md:gap-0">
          <div className="w-full px-6 flex justify-between lg:w-max md:px-0 z-30">
            <Link
              href="/"
              aria-label="logo"
              className="flex space-x-2 items-center"
              onClick={handleLinkClick}
            >
              <span className="text-2xl font-bold text-yellow-900">
                Tailus <span className="text-yellow-700">Feedus</span>
              </span>
            </Link>

            <div className="flex items-center lg:hidden max-h-10">
              <button
                aria-label="hamburger"
                onClick={() => setNavOpen(!navOpen)}
                className="relative w-10 h-auto p-2"
              >
                <div className="m-auto h-0.5 w-6 rounded bg-yellow-900 transition duration-300" />
                <div className="m-auto mt-2 h-0.5 w-6 rounded bg-yellow-900 transition duration-300" />
              </button>
            </div>
          </div>

          {navOpen && (
            <div
              className="fixed w-full h-full left-0 top-0 z-10 bg-yellow-200 bg-opacity-30 backdrop-blur backdrop-filter lg:hidden"
              onClick={() => setNavOpen(false)}
            />
          )}

          <div
            className={`${
              navOpen ? "flex" : "hidden"
            } w-full flex-col lg:flex lg:flex-row justify-end z-30 items-center gap-y-6 p-6 rounded-xl bg-white lg:gap-y-0 lg:p-0 md:flex-nowrap lg:bg-transparent lg:w-7/12`}
          >
            <div className="text-gray-600 lg:pr-4 w-full">
              <ul className="tracking-wide font-medium text-sm flex flex-col gap-y-6 lg:gap-y-0 lg:flex-row w-full">
                <li>
                  <Link
                    href="/all-recipes"
                    onClick={handleLinkClick}
                    className={`block md:px-4 transition hover:text-yellow-700 ${
                      pathname === "/all-recipes"
                        ? "text-yellow-800 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    All Recipes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cart"
                    onClick={handleLinkClick}
                    className={`block md:px-4 transition hover:text-yellow-700 ${
                      pathname === "/cart"
                        ? "text-yellow-800 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    Cart
                  </Link>
                </li>
                <li>
                  <Link
                    href="/wishlist"
                    onClick={handleLinkClick}
                    className={`block md:px-4 transition hover:text-yellow-700 ${
                      pathname === "/wishlist"
                        ? "text-yellow-800 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link
                    href="/recipe-form"
                    onClick={handleLinkClick}
                    className={`block md:px-4 transition hover:text-yellow-700 ${
                      pathname === "/recipe-form"
                        ? "text-yellow-800 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    Upload Recipe
                  </Link>
                </li>
              </ul>
            </div>

            <div className="w-full min-w-max space-y-2 border-yellow-200 lg:space-y-0 sm:w-max lg:border-l">
              {!isLoggedIn ? (
                <>
                  <Link href="/auth/signup" onClick={handleLinkClick}>
                    <button
                      type="button"
                      className="w-full py-3 px-6 text-center rounded-full transition active:bg-yellow-200 focus:bg-yellow-100 sm:w-max"
                    >
                      <span className="block text-yellow-800 font-semibold text-sm">
                        Sign up
                      </span>
                    </button>
                  </Link>
                  <Link href="/auth/login" onClick={handleLinkClick}>
                    <button
                      type="button"
                      className="w-full py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max"
                    >
                      <span className="block text-yellow-900 font-semibold text-sm">
                        Login
                      </span>
                    </button>
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full py-3 px-6 text-center rounded-full transition bg-red-100 hover:bg-red-200 active:bg-red-300 text-red-700 font-semibold text-sm sm:w-max"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
