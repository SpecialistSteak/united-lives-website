import '../styles/sub-nav-banner.css';
import React from 'react';
import Image from 'next/image';

const SubNavBanner: React.FC = () => {
  return (
    <>
      <div className="fl-row fl-row-full-width fl-row-bg-photo fl-node-608bc9a3dd01a fl-row-custom-height fl-row-align-center fl-visible-desktop fl-visible-large fl-visible-medium" data-node="608bc9a3dd01a">
        <div className="fl-col-group fl-node-608bc9a3e4427" data-node="608bc9a3e4427">
          <div className="fl-col fl-node-608bc9a3e44ec" data-node="608bc9a3e44ec">
            <div className="fl-photo fl-photo-align-center" itemScope itemType="https://schema.org/ImageObject">
              <div className="fl-photo-content fl-photo-img-svg">
                <div className="content-image">
                  <Image
                    src="/Images/x2.webp"
                    alt="Content Image"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>
                <div className="overlay-image">
                  <Image
                    src="/Images/uniting-lives-across-india-with-highlight-cropped-2.svg"
                    alt="Overlay Image"
                    style={{ width: '75%', height: 'auto', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                    width={503.752}
                    height={60.742}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="fl-col fl-node-608bcd419ba89 fl-col-small" data-node="608bcd419ba89"></div>
        </div>
      </div>
      <div className="mobile-banner">
        <div className="content-image"></div>
        <div className="overlay-image">
          <Image
            src="/Images/United-Lives-Mobile-Banner-SVG-cropped.svg"
            alt="United Lives Mobile Banner"
            width={270}
            height={93.94350383631715}
            layout="intrinsic"
          />
        </div>
      </div>
    </>
  );
};

export default SubNavBanner;