"use client";

import React, { useEffect, useState } from "react";
import $ from "jquery";
import "../styles/header.css";
import SearchComponent from "./search-component";
import Image from "next/image";
import { MenuItem } from "../types/menu-item";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const [isMainNavSticky, setIsMainNavSticky] = useState(false);
  const [isMobileHeaderSticky, setIsMobileHeaderSticky] = useState(false);

  useEffect(() => {
    const $mainNav = $(".main-nav");

    // Setup submenus
    function setupSubmenus() {
      $mainNav.find("li").each(function () {
        const $this = $(this);
        const $link = $this.children("a");
        const $submenu = $this.children("ul");

        if ($submenu.length) {
          // For desktop: mouseenter and mouseleave events
          $this
            .on("mouseenter", function () { 
              // Only show submenu on desktop
              if (window.innerWidth > 768) {
                $submenu.stop(true, true).fadeIn(300);
              }
            })
            .on("mouseleave", function () {
              // hide submenu on desktop
              if (window.innerWidth > 768) {
                $submenu.stop(true, true).fadeOut(200);
              }
            });

          // For mobile: toggle submenu on click
          $link.on("click", function (e) {
            // toggle submenu on mobile
            if (window.innerWidth <= 768) {
              e.preventDefault();
              const index = $this.index();
              setOpenSubmenus((prev) => ({
                ...prev,
                [index]: !prev[index],
              }));
            }
          });
        }
      });
    }

    setupSubmenus();

    // Update scroll event listener
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const mainBarHeight = $(".main-bar").outerHeight() || 0;
      const topBarHeight = $(".top-bar").outerHeight() || 0;
      const triggerPosition = topBarHeight + mainBarHeight;

      setIsMainNavSticky(scrollPosition > triggerPosition);
      setIsMobileHeaderSticky(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderMenuItems = (items: MenuItem[], level = 0) => {
    return items.map((item, index) => (
      <li key={index}>
        <a
          href={item.href}
          className={`navbar-href ${item.children ? "has-submenu" : ""} ${
            openSubmenus[`${level}-${index}`] ? "open" : ""
          }`}
          onClick={(e) => {
            if (item.children && window.innerWidth <= 768) {
              e.preventDefault();
              setOpenSubmenus((prev) => ({
                ...prev,
                [`${level}-${index}`]: !prev[`${level}-${index}`],
              }));
            }
          }}
        >
          {item.label}
        </a>
        {item.children && (
          <ul
            style={{
              display: openSubmenus[`${level}-${index}`] ? "block" : "none",
            }}
          >
            {renderMenuItems(item.children, level + 1)}
          </ul>
        )}
      </li>
    ));
  };

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "News", href: "/blog" },
    { label: "Gallery", href: "/gallery" },
    {
      label: "About Us",
      href: "#",
      children: [
        { label: "Our Vision", href: "/blog/14" },
        {
          label: "About United Lives",
          href: "#",
          children: [
            { label: "Our Team", href: "/blog/19" },
            { label: "Support Us", href: "/contact" },
            { label: "Volunteer with Us", href: "/contact" },
          ],
        },
        {
          label: "Our Projects",
          href: "/our-work",
        },
      ],
    },
    {
      label: "How We Help",
      href: "#",
      children: [
        { label: "Our Work", href: "/our-work" },
        { label: "Find a Project", href: "/blog/20" },
      ],
    },
    {
      label: "Campaigns",
      href: "#",
      children: [
        { label: "Education for All", href: "/blog/18" },
        { label: "Clean Water Initiative", href: "/blog/17" },
        { label: "Women Empowerment", href: "/blog/16" },
        { label: "Child Welfare", href: "/blog/15" },
      ],
    },
    { label: "FAQ", href: "/faq" }
  ];

  return (
    <header>
      <div className="top-bar">
        <nav>
          <ul>
            <li>
              <a href="#" className="navbar-href">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="navbar-href">
                Support Us
              </a>
            </li>
            <li>
              <a href="#" className="navbar-href">
                Donate
              </a>
            </li>
          </ul>
        </nav>
        <div className="social-icons">
          <a href="#" className="navbar-href icon-facebook"></a>
          <a href="#" className="navbar-href icon-twitter"></a>
          <a href="#" className="navbar-href icon-instagram"></a>
          <a href="#" className="navbar-href icon-youtube"></a>
        </div>
      </div>
      <div className="main-bar">
        <div className="logo">
          <a href="/" className="navbar-href">
            <Image
              src="/Images/united-lives-new-logo-with-text-cropped-minimized-white.svg"
              alt="United Lives"
              width={100}
              height={100}
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </a>
        </div>
        <div className="tagline">
          <h5>
            Dreaming Big for a Better Future with <strong>United Lives</strong>{" "}
            in India
          </h5>
        </div>
      </div>

      <div className={`mobile-nav ${isMobileHeaderSticky ? "sticky" : ""}`}>
        <div className="logo">
          <a href="/" className="navbar-href">
            <Image
              src="/Images/united-lives-new-logo-with-text-cropped-minimized-white.svg"
              alt="United Lives"
              width={100}
              height={100}
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </a>
        </div>
        <button className="menu-toggle" onClick={toggleMobileMenu}>
          <span className="material-icons">
            {isMobileMenuOpen ? "\u2715" : "\u2630"}
          </span>
        </button>
      </div>

      <nav className={`main-nav ${isMobileMenuOpen ? "mobile-open" : ""} ${isMainNavSticky ? "sticky" : ""}`}>
        <ul>{renderMenuItems(menuItems)}</ul>
        <div className="search-icon">
          <SearchComponent />
        </div>
      </nav>
    </header>
  );
};

export default Header;