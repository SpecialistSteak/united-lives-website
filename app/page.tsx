"use client";

import React, { useState } from "react";
import Image from "next/image";
import "@/styles/main-page.css"; // Make sure this path is correct
import TabbedSection from "@/components/tabbed-section";
import SubNavBanner from "@/components/sub-nav-banner";

export default function Home() {
  return (
    <>
      <SubNavBanner />
      <main>
        <section className="ul-hero">
          <div className="ul-container">
            <h1 className="ul-hero-title">
              Empowering Roma Communities Across India
            </h1>
            <p className="ul-hero-text">
              United Lives is dedicated to protecting the rights of Roma
              people, securing their legal rights, and fostering equality for
              the Roma people.
            </p>
            <a
              href="/donate"
              className="ul-button ul-button-primary"
            >
              Donate Now
            </a>
          </div>
        </section>

        <section className="ul-mission">
          <div className="ul-container">
            <h2 className="ul-section-title">Our Mission</h2>
            <TabbedSection />
          </div>
        </section>

        <section className="ul-impact">
          <div className="ul-container">
            <h2 className="ul-section-title our-impact">
              <span className="background-color-box">Our Impact</span>
            </h2>
            <div className="ul-impact-grid">
              <div className="ul-impact-card">
                <Image
                  src="https://etrlcrutldimhgcd.public.blob.vercel-storage.com/III-2GpvISRBtmEEbFMRhZHMZVzQWhSGAM.jpeg"
                  alt="Community Advocacy"
                  className="ul-impact-image"
                  width={640}
                  height={360}
                />
                <h3>Community Advocacy</h3>
                <p>
                  Successfully advocating for policy changes, improving access
                  to education, healthcare, and housing.
                </p>
              </div>
              <div className="ul-impact-card">
                <Image
                  src="https://etrlcrutldimhgcd.public.blob.vercel-storage.com/B-bb12jniGEbow0DXjwVx4jDk1Uk7cLY.jpeg"
                  alt="Cultural Preservation"
                  className="ul-impact-image"
                  width={385}
                  height={385}
                />
                <h3>Cultural Preservation</h3>
                <p>
                  Preserving and celebrating the rich cultural heritage of the
                  Roma people.
                </p>
              </div>
              <div className="ul-impact-card">
                <Image
                  src="https://etrlcrutldimhgcd.public.blob.vercel-storage.com/T-4gWv2cqbv2RGtNjHwlrA2BDrbS4uE6.jpeg"
                  alt="Legal Support"
                  className="ul-impact-image"
                  width={432}
                  height={576}
                />
                <h3>Legal Support</h3>
                <p>
                  Providing crucial legal assistance, challenging discriminatory
                  practices and defending rights.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="ul-get-involved">
          <div className="ul-container">
            <h2 className="ul-section-title">Get Involved</h2>
            <div className="ul-involvement-options">
              <div className="ul-involvement-option">
                <h3>Contact Us</h3>
                <p>
                  Reach out to learn more about our work or how you can support
                  our mission.
                </p>
                <a href="/contact" className="ul-button">
                  Contact Us
                </a>
              </div>
              <div className="ul-involvement-option">
                <h3>Volunteer</h3>
                <p>
                  Join our team of dedicated volunteers and make a direct impact
                  in our communities.
                </p>
                <a href="/contact" className="ul-button">
                  Volunteer
                </a>
              </div>
              <div className="ul-involvement-option">
                <h3>Talk With Us</h3>
                <p>
                  Our team is available to call Monday through Sunday, from
                  sunrise to sunset in India.
                </p>
                <p className="ul-helpline-number">+91 (044) 6050 7333</p>
              </div>
            </div>
          </div>
        </section>

        <section className="ul-news">
          <div className="ul-container">
            <h2 className="ul-section-title">Important News</h2>
            <div className="ul-news-grid">
              <div className="ul-news-card">
                <Image
                  src="/Images/news1.jpg"
                  alt="News 1"
                  className="ul-news-image"
                  width={300}
                  height={265}
                />
                <div className="ul-news-content">
                  <p className="ul-news-date">20 April 2023</p>
                  <h3>
                    Govt to build memorial for Roma migrants to Europe who trace
                    roots to India
                  </h3>
                  <a
                    href="https://www.indianarrative.com/world-news/govt-to-build-memorial-for-roma-migrants-to-europe-who-trace-roots-to-india-133992.html"
                    className="ul-button"
                  >
                    Read More
                  </a>
                </div>
              </div>
              <div className="ul-news-card">
                <Image
                  src="/Images/news2.jpg"
                  alt="News 2"
                  className="ul-news-image"
                  width={300}
                  height={265}
                />
                <div className="ul-news-content">
                  <p className="ul-news-date">12 April 2022</p>
                  <h3>
                    International Roma Conference Result - Romani Community
                    Termed Indian Diaspora
                  </h3>
                  <a
                    href="https://indianexpress.com/article/world/croatia-roma-conference-community-termed-indian-diaspora-7864924/"
                    className="ul-button"
                  >
                    Read More
                  </a>
                </div>
              </div>
              <div className="ul-news-card">
                <Image
                  src="/Images/news3.jpg"
                  alt="News 3"
                  className="ul-news-image"
                  width={300}
                  height={265}
                />
                <div className="ul-news-content">
                  <p className="ul-news-date">28 June 2017</p>
                  <h3>
                    Relevant Publication - The Roma and the Subaltern
                    Communities of India
                  </h3>
                  <a
                    href="https://www.errc.org/news/the-roma-and-the-subaltern-communities-of-india"
                    className="ul-button"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ul-newsletter">
          <div className="ul-container">
            <h2 className="ul-newsletter-title">Stay Informed and Involved</h2>
            <p>
              Join our newsletter to receive updates on our work, upcoming
              events, and ways you can support our mission.
            </p>
            <form className="ul-newsletter-form">
              <input
                type="email"
                placeholder="Your email address"
                className="ul-newsletter-input"
              />
              <button type="submit" className="ul-button ul-button-primary">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}