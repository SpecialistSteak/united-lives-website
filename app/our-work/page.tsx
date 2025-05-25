import React from "react";
import Image from "next/image";
import "@/styles/our-work.css";

const OurWorkPage = () => {
  return (
    <div className="our-work-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Our Work</h1>
          <p>
            Discover the impact we&apos;ve made and the lives we&apos;ve touched through
            our dedicated efforts.
          </p>
        </div>
      </section>

      <section className="projects-section">
        {/* Cultural Preservation (Originally Education) */}
        <div className="project-card">
          <Image
            src="https://etrlcrutldimhgcd.public.blob.vercel-storage.com/III-2GpvISRBtmEEbFMRhZHMZVzQWhSGAM.jpeg"
            alt="Cultural Preservation"
            className="project-image"
            width={500}
            height={300}
            objectFit="cover"
            objectPosition="top"
          />
          <div className="project-info">
            <h3>Cultural Preservation</h3>
            <p>
              We work to preserve and celebrate the rich cultural heritage of
              the Roma people through various initiatives, including cultural
              events, educational programs, and documentation efforts.
            </p>
            <a href="/blog" className="project-link">
              Learn More
            </a>
          </div>
        </div>

        {/* Community Advocacy */}
        <div className="project-card">
          <Image
            src="https://etrlcrutldimhgcd.public.blob.vercel-storage.com/GG-AHeBF2tA6qJaPYW9rs2Jd7QFIXMFOo.jpeg"
            alt="Community Advocacy"
            className="project-image"
            width={500}
            height={300}
          />
          <div className="project-info">
            <h3>Community Advocacy</h3>
            <p>
              We advocate for policy changes at local and national levels to
              improve the lives of Roma communities, focusing on access to
              education, healthcare, housing, and employment opportunities.
            </p>
            <a href="/blog" className="project-link">
              Learn More
            </a>
          </div>
        </div>

        {/* Legal Support */}
        <div className="project-card">
          <Image
            src="https://etrlcrutldimhgcd.public.blob.vercel-storage.com/JJJ-CBJiOEj20lT1TbOLDVBfn4uTemmRWE.jpeg"
            alt="Legal Support"
            className="project-image"
            width={500}
            height={300}
          />
          <div className="project-info">
            <h3>Legal Support</h3>
            <p>
              We help to provide essential support to Roma individuals and
              communities, challenging discriminatory practices, defending their
              rights, and pursuing justice through legal fighting.
            </p>
            <a href="/blog" className="project-link">
              Learn More
            </a>
          </div>
        </div>

        {/* Education and Empowerment (Originally Healthcare) */}
        <div className="project-card">
          <Image
            src="https://etrlcrutldimhgcd.public.blob.vercel-storage.com/FF-OCtwxEo7vKbjxrzPwteosglQ4tknw1.jpeg"
            alt="Education and Empowerment"
            className="project-image"
            width={500}
            height={300}
          />
          <div className="project-info">
            <h3>Education and Empowerment</h3>
            <p>
              We believe that education is key to empowerment. We help
              to provide education for Roma children and
              adults, helping them build a brighter future.
            </p>
            <a href="/blog" className="project-link">
              Learn More
            </a>
          </div>
        </div>

        {/* Healthcare Initiatives (Originally Cultural Preservation) */}
        <div className="project-card">
          <Image
            src="https://etrlcrutldimhgcd.public.blob.vercel-storage.com/CC-KwXVqoGMWhqefXhU5qGBUkVG3GhwPt.jpeg"
            alt="Healthcare Initiatives"
            className="project-image"
            width={500}
            height={300}
          />
          <div className="project-info">
            <h3>Healthcare Initiatives</h3>
            <p>
              We are committed to improving the health and well-being of Roma
              communities by providing access to healthcare services, health
              education, and promoting healthy living.
            </p>
            <a href="/blog" className="project-link">
              Learn More
            </a>
          </div>
        </div>

        {/* Economic Development */}
        <div className="project-card">
          <Image
            src="https://etrlcrutldimhgcd.public.blob.vercel-storage.com/GGG-Y3cWUF10FYFXRODX48UaFgOApcQvyx.jpeg"
            alt="Economic Development"
            className="project-image"
            width={500}
            height={300}
          />
          <div className="project-info">
            <h3>Economic Development</h3>
            <p>
              We support economic development in Roma communities through
              training programs, product making courses, and shop venues to
              foster financial independence and sustainability.
            </p>
            <a href="/blog" className="project-link">
              Learn More
            </a>
          </div>
        </div>

        {/* New Project 1 */}
        <div className="project-card">
          <Image
            src="https://etrlcrutldimhgcd.public.blob.vercel-storage.com/MM-k0mIxa7DGuXDyrCSznHK9s46lBL2ss.jpeg"
            alt="Youth Engagement"
            className="project-image"
            width={500}
            height={300}
          />
          <div className="project-info">
            <h3>Youth Engagement</h3>
            <p>
              We actively engage with Roma youth, providing them with
              opportunities for leadership development, skills training, and
              participation in community-building activities.
            </p>
            <a href="/blog" className="project-link">
              Learn More
            </a>
          </div>
        </div>

        {/* New Project 2 */}
        <div className="project-card">
          <Image
            src="https://etrlcrutldimhgcd.public.blob.vercel-storage.com/OO-kak0Wx79RBiyW3qsJSZtuY4SJN2pPy.jpeg"
            alt="Housing and Infrastructure"
            className="project-image"
            width={500}
            height={300}
          />
          <div className="project-info">
            <h3>Housing and Infrastructure</h3>
            <p>
              We work to improve housing conditions and infrastructure in Roma
              communities, advocating for access to safe, adequate, and
              affordable housing, clean water, and sanitation.
            </p>
            <a href="/blog" className="project-link">
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurWorkPage;