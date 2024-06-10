'use client';

import React, { useEffect } from 'react';
import $ from 'jquery';

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

    // Trigger in-page search
    window.triggerSearch = function() {
      let searchTerm = prompt("Enter the text to search for:");
      if (searchTerm) {
        if (!window.find(searchTerm)) {
          alert("No matches found.");
        }
      }
    }

  }, []);

  return (
        <><div className="top-bar">
            <nav>
                <ul>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">Support Us</a></li>
                    <li><a href="#">Donate</a></li>
                </ul>
            </nav>
            <div className="social-icons">
                <a href="#" className="icon-facebook"></a>
                <a href="#" className="icon-twitter"></a>
                <a href="#" className="icon-instagram"></a>
                <a href="#" className="icon-youtube"></a>
            </div>
        </div><div className="main-bar">
                <div className="logo">
                    <a href="#">
                        <img src="./united-lives-new-logo-with-text-cropped-minimized-white.svg" alt="United Lives" />
                    </a>
                </div>
                <div className="tagline">
                    <h5>Dreaming Big for a Better Future with <strong>United Lives</strong> in India</h5>
                </div>
            </div><nav className="main-nav">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li>
                        <a href="#">About Us</a>
                        <ul>
                            <li>
                                <a href="#">Our Vision</a>
                                <ul>
                                    <li><a href="#">Education & Literacy</a></li>
                                    <li><a href="#">Health & Family Welfare</a></li>
                                    <li><a href="#">Food Processing</a></li>
                                    <li><a href="#">Community Development</a></li>
                                    <li><a href="#">Tamil Nadu Initiatives</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">About United Lives</a>
                                <ul>
                                    <li><a href="#">Our Team</a></li>
                                    <li><a href="#">Our Trustees</a></li>
                                    <li><a href="#">Our Partners</a></li>
                                    <li><a href="#">Our History</a></li>
                                    <li><a href="#">Frequently Asked Questions</a></li>
                                    <li><a href="#">Support Us</a></li>
                                    <li><a href="#">Volunteer with Us</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">Our Projects</a>
                                <ul>
                                    <li><a href="#">Supporting Children</a></li>
                                    <li><a href="#">Emergency Support</a></li>
                                    <li><a href="#">Building an Orphanage</a></li>
                                    <li><a href="#">Training Women for Jobs</a></li>
                                    <li><a href="#">Sponsoring Education</a></li>
                                    <li><a href="#">Water Pumps</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">How We Help</a>
                        <ul>
                            <li><a href="#">Our Work</a></li>
                            <li><a href="#">Find a Project</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">Campaigns</a>
                        <ul>
                            <li><a href="#">Education for All</a></li>
                            <li><a href="#">Clean Water Initiative</a></li>
                            <li><a href="#">Women Empowerment</a></li>
                            <li><a href="#">Child Welfare</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">Resources</a>
                        <ul>
                            <li><a href="#">Reports and Publications</a></li>
                            <li><a href="#">Educational Resources</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">Communities</a>
                        <ul>
                            <li>
                                <a href="#">Community Resources</a>
                                <ul>
                                    <li><a href="#">Roma (Romanis) Colony</a></li>
                                    <li><a href="#">Kotupuram Colony</a></li>
                                    <li><a href="#">Narikuravur Colony</a></li>
                                    <li><a href="#">Vugri People</a></li>
                                    <li><a href="#">Cultural Heritage</a></li>
                                    <li><a href="#">Community Stories</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">Language Resources</a>
                                <ul>
                                    <li><a href="#">Tamil</a></li>
                                    <li><a href="#">Local Dialects</a></li>
                                    <li><a href="#">Community Languages</a></li>
                                    <li><a href="#">Language Preservation</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li><a href="#">News</a></li>
                </ul>
            <style jsx>{`
                .invisible-button {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0;
                    display: inline;
                }
                `}</style>

            <div className="search-icon">
              <button className="invisible-button">
                <i className="fa fa-search white-icon"></i>
              </button>
            </div>
            </nav></>
    )
}

export default HeaderAndNavbar;