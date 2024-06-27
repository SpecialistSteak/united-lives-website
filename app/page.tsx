import React from "react";
import SubNavBanner from "@/components/sub-nav-banner";
import TabbedSection from "@/components/tabbed-section";
import Image from "next/image";
import "@/styles/main-page.css";

export default function Home() {
  return (
    <>
      <SubNavBanner />
      <main>
        <section className="ul-hero">
          <div className="ul-container">
            <h1 className="ul-hero-title">
              Empowering Gypsy Communities Across India
            </h1>
            <p className="ul-hero-text">
              United Lives is dedicated to protecting the rights of Gypsy
              people, securing their legal rights, and fostering equality for
              the Gypsy people.
            </p>
            <a href="#" className="ul-button ul-button-primary">
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
                  Gypsy people.
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
                <a href="/volunteer" className="ul-button">
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
            <h2 className="ul-section-title">Latest News</h2>
            <div className="ul-news-grid">
              <div className="ul-news-card">
                <Image
                  src="https://etrlcrutldimhgcd.public.blob.vercel-storage.com/III-2GpvISRBtmEEbFMRhZHMZVzQWhSGAM.jpeg"
                  alt="News 1"
                  className="ul-news-image"
                  width={300}
                  height={265}
                />
                <div className="ul-news-content">
                  <p className="ul-news-date">18 June 2024</p>
                  <h3>
                    Landmark Victory: High Court Ruling Protects Gypsy Rights
                  </h3>
                  <a href="#" className="ul-button">
                    Read More
                  </a>
                </div>
              </div>
              <div className="ul-news-card">
                <Image
                  src="https://etrlcrutldimhgcd.public.blob.vercel-storage.com/B-bb12jniGEbow0DXjwVx4jDk1Uk7cLY.jpeg"
                  alt="News 2"
                  className="ul-news-image"
                  width={300}
                  height={265}
                />
                <div className="ul-news-content">
                  <p className="ul-news-date">14 May 2024</p>
                  <h3>
                    United Lives Launches New Education Initiative for Gypsy
                    Youth
                  </h3>
                  <a href="#" className="ul-button">
                    Read More
                  </a>
                </div>
              </div>
              <div className="ul-news-card">
                <Image
                  src="https://etrlcrutldimhgcd.public.blob.vercel-storage.com/T-4gWv2cqbv2RGtNjHwlrA2BDrbS4uE6.jpeg"
                  alt="News 3"
                  className="ul-news-image"
                  width={300}
                  height={265}
                />
                <div className="ul-news-content">
                  <p className="ul-news-date">26 April 2024</p>
                  <h3>
                    Celebrating Diversity: Annual Gypsy Culture Festival
                    Announced
                  </h3>
                  <a href="#" className="ul-button">
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
