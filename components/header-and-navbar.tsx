'use client';

import React, { useEffect } from 'react';
import $ from 'jquery';
import '../styles/header-and-navbar.css';
import SearchComponent from './search-component';

const HeaderAndNavbar = () => {
  useEffect(() => {
    // Constants
    const $mainNav = $('.main-nav');

    // Submenu Hover Effect
    function setupSubmenus() {
      $mainNav.find('li').on("mouseenter", function() {
        const $submenu = $(this).children('ul');
        if ($submenu.length) {
          $submenu.stop(true, true).fadeIn(300);
        }
      }).on("mouseleave", function() {
        const $submenu = $(this).children('ul');
        if ($submenu.length) {
          $submenu.stop(true, true).fadeOut(200);
        }
      });
    }
    
    // Initialize
    function init() {
      setupSubmenus();
    }

    init();

        // Define triggerSearch only if window is available
        if (typeof window !== 'undefined') {
            // Trigger in-page search
            window.triggerSearch = function() {
              let searchTerm = prompt("Enter the text to search for:");
              if (searchTerm) {
                if (!window.find(searchTerm)) {
                  alert("No matches found.");
                }
              }
            }
          }
      

  }, []);

  return (
        <><div className="top-bar">
            <nav>
                <ul>
                    <li><a href="#" className="navbar-href">Contact Us</a></li>
                    <li><a href="#" className="navbar-href">Support Us</a></li>
                    <li><a href="#" className="navbar-href">Donate</a></li>
                </ul>
            </nav>
            <div className="social-icons">
                <a href="#" className="navbar-href icon-facebook"></a>
                <a href="#" className="navbar-href icon-twitter"></a>
                <a href="#" className="navbar-href icon-instagram"></a>
                <a href="#" className="navbar-href icon-youtube"></a>
            </div>
        </div><div className="main-bar">
                <div className="logo">
                    <a href="#" className="navbar-href">
                        <img src="./united-lives-new-logo-with-text-cropped-minimized-white.svg" alt="United Lives" />
                    </a>
                </div>
                <div className="tagline">
                    <h5>Dreaming Big for a Better Future with <strong>United Lives</strong> in India</h5>
                </div>
            </div><nav className="main-nav">
                <ul>
                    <li><a href="#" className="navbar-href">Home</a></li>
                    <li>
                        <a href="#" className="navbar-href">About Us</a>
                        <ul>
                            <li>
                                <a href="#" className="navbar-href">Our Vision</a>
                                <ul>
                                    <li><a href="#" className="navbar-href">Education & Literacy</a></li>
                                    <li><a href="#" className="navbar-href">Health & Family Welfare</a></li>
                                    <li><a href="#" className="navbar-href">Food Processing</a></li>
                                    <li><a href="#" className="navbar-href">Community Development</a></li>
                                    <li><a href="#" className="navbar-href">Tamil Nadu Initiatives</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#" className="navbar-href">About United Lives</a>
                                <ul>
                                    <li><a href="#" className="navbar-href">Our Team</a></li>
                                    <li><a href="#" className="navbar-href">Our Trustees</a></li>
                                    <li><a href="#" className="navbar-href">Our Partners</a></li>
                                    <li><a href="#" className="navbar-href">Our History</a></li>
                                    <li><a href="#" className="navbar-href">Frequently Asked Questions</a></li>
                                    <li><a href="#" className="navbar-href">Support Us</a></li>
                                    <li><a href="#" className="navbar-href">Volunteer with Us</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#" className="navbar-href">Our Projects</a>
                                <ul>
                                    <li><a href="#" className="navbar-href">Supporting Children</a></li>
                                    <li><a href="#" className="navbar-href">Emergency Support</a></li>
                                    <li><a href="#" className="navbar-href">Building an Orphanage</a></li>
                                    <li><a href="#" className="navbar-href">Training Women for Jobs</a></li>
                                    <li><a href="#" className="navbar-href">Sponsoring Education</a></li>
                                    <li><a href="#" className="navbar-href">Water Pumps</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="navbar-href">How We Help</a>
                        <ul>
                            <li><a href="#" className="navbar-href">Our Work</a></li>
                            <li><a href="#" className="navbar-href">Find a Project</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="navbar-href">Campaigns</a>
                        <ul>
                            <li><a href="#" className="navbar-href">Education for All</a></li>
                            <li><a href="#" className="navbar-href">Clean Water Initiative</a></li>
                            <li><a href="#" className="navbar-href">Women Empowerment</a></li>
                            <li><a href="#" className="navbar-href">Child Welfare</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="navbar-href">Resources</a>
                        <ul>
                            <li><a href="#" className="navbar-href">Reports and Publications</a></li>
                            <li><a href="#" className="navbar-href">Educational Resources</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="navbar-href">Communities</a>
                        <ul>
                            <li>
                                <a href="#" className="navbar-href">Community Resources</a>
                                <ul>
                                    <li><a href="#" className="navbar-href">Roma (Romanis) Colony</a></li>
                                    <li><a href="#" className="navbar-href">Kotupuram Colony</a></li>
                                    <li><a href="#" className="navbar-href">Narikuravur Colony</a></li>
                                    <li><a href="#" className="navbar-href">Vugri People</a></li>
                                    <li><a href="#" className="navbar-href">Cultural Heritage</a></li>
                                    <li><a href="#" className="navbar-href">Community Stories</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#" className="navbar-href">Language Resources</a>
                                <ul>
                                    <li><a href="#" className="navbar-href">Tamil</a></li>
                                    <li><a href="#" className="navbar-href">Local Dialects</a></li>
                                    <li><a href="#" className="navbar-href">Community Languages</a></li>
                                    <li><a href="#" className="navbar-href">Language Preservation</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li><a href="#" className="navbar-href">News</a></li>
                </ul>
            <div className="search-icon">
              <SearchComponent />
            </div>
            </nav></>
    )
}

export default HeaderAndNavbar;