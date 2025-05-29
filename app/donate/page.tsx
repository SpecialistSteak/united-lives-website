import React from 'react';
import Image from 'next/image';
import '../../styles/contact-us.css';

const DonatePage: React.FC = () => {
  const whatsappNumber = "+91 6381 310 381";
  const whatsappLink = "https://wa.me/916381310381";

  return (
    <div className="contact-page-container">
      {}
      <div className="contact-form-wrapper"> {}
        {}
        <h1 className="contact-page-title">Contact United Lives</h1>

        <p className="whatsapp-instruction"> {}
          Currently, we are accepting donations, but due to logistical issues, we have not been able to set up a donation page. Please contact us if you are interested in donating at the link below or by scanning the QR code.
        </p>
        <p className="whatsapp-instruction-scan"> {}
          Scan the QR code below or click the button to contact us.
        </p>

        {}
        <div className="qr-code-display-wrapper">
          <Image
            src="/Images/contactqr.png" 
            alt={`WhatsApp United Lives at ${whatsappNumber}`}
            width={250}
            height={250}
            priority
            className="qr-code-image" 
          />
        </div>

        {}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="form-submit-button whatsapp-link-as-button" 
        >
          Chat on WhatsApp
        </a>

        <p className="whatsapp-direct-number-display"> {}
          Or add us directly: {whatsappNumber}
        </p>
      </div>
    </div>
  );
};

export default DonatePage;