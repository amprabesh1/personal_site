/*
   Copyright (C), 2023-2024, Sara Echeverria (bl33h)
*/

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { styles } from "../../styles.js";
import { navLinks } from "../../Constants/constants";
import { bl33hIcon, menu, close } from "../../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // ✅ FIXED SCROLL SYNC (NO VISUAL CHANGES)
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let mostVisible = null;
        let maxRatio = 0;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisible = entry.target;
          }
        });

        if (mostVisible?.id) {
          setActive(mostVisible.id);
        }
      },
      {
        threshold: [0.2, 0.4, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <nav
      className={`
        ${styles.paddingX} w-full flex items-center py-5
        fixed top-0 z-20 bg-transparent
      `}
    >
      <div className="w-full flex justify-between items-center max-w-7x1 mx-auto">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <span
            className="text-3xl text-primary-200 font-normal"
            style={{ fontFamily: "SuperMario", fontWeight: '100' }}
          >
            PA
          </span>
        </Link>

        {/* ✅ Desktop Menu */}
        <ul className="list-none hidden sm:flex flex-row gap-6 items-center">
          <li>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-9 h-9 rounded-xl border-2 border-[#1E3A8A] dark:border-primary-200 flex items-center justify-center transition-all duration-300 hover:bg-[#1E3A8A] dark:hover:bg-primary-200 group"
              aria-label="Toggle dark mode"
            >
              <FontAwesomeIcon
                icon={darkMode ? faSun : faMoon}
                className="text-[#1E3A8A] dark:text-primary-200 group-hover:text-white dark:group-hover:text-dark-bg transition-colors duration-300"
              />
            </button>
          </li>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setActive(link.id)}
                className={`
                  px-6 py-2 rounded-xl text-[18px] font-semibold transition-all duration-300
                  border-2 border-[#1E3A8A] dark:border-primary-200
                  ${
                    active === link.id
                      ? "bg-[#1E3A8A] text-white dark:bg-primary-200 dark:text-dark-bg"
                      : "text-[#1E3A8A] dark:text-primary-200 hover:bg-[#1E3A8A] hover:text-white dark:hover:bg-primary-200 dark:hover:text-dark-bg"
                  }
                `}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>

        {/* ✅ Mobile Menu (UNCHANGED UI) */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            className="w-[28px] h-[28px] object-contain cursor-pointer z-20"
            onClick={() => setToggle(!toggle)}
            src={toggle ? close : menu}
            alt="menu"
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } pt-20 p-6 bg-white dark:bg-dark-card absolute top-2 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl shadow-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4 w-full">
              {navLinks.map((link) => (
                <li key={link.id} className="w-full">
                  <a
                    href={`#${link.id}`}
                    onClick={() => {
                      setActive(link.id);
                      setToggle(!toggle);
                    }}
                    className={`
                      block w-full text-center px-4 py-2 rounded-lg text-[16px] font-medium transition-all
                      border border-[#1E3A8A] dark:border-primary-200
                      ${
                        active === link.id
                          ? "bg-[#1E3A8A] text-white dark:bg-primary-200 dark:text-dark-bg"
                          : "text-[#1E3A8A] dark:text-primary-200 hover:bg-[#1E3A8A] hover:text-white dark:hover:bg-primary-200 dark:hover:text-dark-bg"
                      }
                    `}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
