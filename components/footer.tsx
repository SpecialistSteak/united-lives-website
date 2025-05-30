import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="mt-5 pt-5 pb-5 footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-xs-12 about-company">
            <h2>United Lives</h2>
            <p className="pr-5 text-white-50">
              We are an NGO based in Chennai, Tamil Nadu, India, with the
              primary objective of supporting the self-development of united
              lives and tribal communities. We aim to raise money, inform our
              cause, and make a positive impact on the lives of those we serve.
            </p>
            <p>Learn more about us and our work:</p>
            <ul>
              <li>
                <a href="/blog/19">Our Team</a>
              </li>
              <li>
                <a href="/our-work">What We Do</a>
              </li>
              <li>
                <a href="/blog/14">Our Vision</a>
              </li>
            </ul>
            <p>Connect with us:</p>
            <p>
              <a href="https://wa.me/916381310381">
                <i className="fa fa-whatsapp mr-1"></i>
              </a>
            </p>
          </div>
          <div className="col-lg-3 col-xs-12 links">
            <h4 className="mt-lg-0 mt-sm-3">Useful Links</h4>
            <ul className="m-0 p-0">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/blog/19">About Us</a>
              </li>
              <li>
                <a href="/our-work">Projects</a>
              </li>
              <li>
                <a href="/gallery">Gallery</a>
              </li>
              <li>
                <a href="/blog">News</a>
              </li>
              <li>
                <a href="/donate">Donate</a>
              </li>
              <li>
                <a href="/contact">Contacts</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-xs-12 location">
            <h4 className="mt-lg-0 mt-sm-4">Get Involved</h4>
            <p>
              Join our community and make a difference. Sign up to volunteer for
              our cause.
            </p>
            <p>
              Volunteer: <a href="/contact">Sign Up</a>
            </p>
            <h4 className="mt-4">Contact Us</h4>
            <p>
              3/92b, Padasalai Street, Vettuvankani, ECR,
              <br />
              Chennai- 600 115.
            </p>
            <p className="mb-0">
              Phone: <a href="tel:04460507333">(044) 60507333</a>
            </p>
            <p>
              Email:{" "}
              <a href="mailto:info@unitedlives.in">info@unitedlives.in</a>
            </p>
            <h4 className="mt-4">Donate</h4>
            <p>
              Donate: <a href="/donate">Give Now</a>
            </p>
          </div>
        </div>
        <div className="col copyright p-0">
          <hr
            className="mb-3"
            style={{
              border: "none",
              height: "1px",
              background:
                "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.75), rgba(255,255,255,0))",
              margin: "20px 0",
              position: "relative",
            }}
          />
          <div
            style={{
              position: "relative",
              paddingTop: "15px",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-0">
              <small className="text-white-50">
                United Lives © 2025. All Rights Reserved.
              </small>
              <small className="text-white-50">
                Website coded and designed by Luke Merletti
              </small>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
