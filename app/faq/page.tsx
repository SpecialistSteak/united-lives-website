"use client";

import React, { useState } from "react";
import "@/styles/faq.css";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQPage: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      question: "What is the mission of United Lives?",
      answer:
        "United Lives is dedicated to empowering Roma communities in India by protecting their rights, securing their legal standing, and fostering equality. We work to improve their access to education, healthcare, housing, economic opportunities, and social inclusion.",
    },
    {
      question: "Who are the Roma people?",
      answer:
        "The Roma people, also known as Romani, are an ethnic group with origins in the Indian subcontinent. They have a rich cultural heritage and have faced historical and ongoing discrimination in various parts of the world. In India, they are a vibrant part of the diverse social fabric.",
    },
    {
      question: "What are some of the challenges faced by Roma communities in India?",
      answer:
        "Roma communities in India often face challenges related to social stigma, discrimination, limited access to education and healthcare, inadequate housing, and economic marginalization. United Lives works to address these challenges and promote their well-being.",
    },
    {
      question: "Where does United Lives operate?",
      answer:
        "Our primary focus is on supporting Roma communities in Chennai, India. However, we aim to expand our reach and impact other regions as we grow and resources allow.",
    },
    {
      question: "What are the main areas of focus for United Lives?",
      answer:
        "Our work encompasses several key areas: Cultural Preservation, Community Advocacy, Legal Support, Education and Empowerment, Healthcare Initiatives, Economic Development, Youth Engagement, and Housing and Infrastructure.",
    },
    {
      question: "How does United Lives ensure the effectiveness of its programs?",
      answer:
        "We work closely with the Roma communities to understand their needs and priorities. Our programs are designed to be culturally sensitive, sustainable, and impactful. We regularly monitor and evaluate our work to ensure we are achieving our goals and making a positive difference.",
    },
    {
      question: "Can I learn more about specific projects undertaken by United Lives?",
      answer:
        'Yes, you can find more detailed information about our ongoing projects and initiatives in the "Our Work" section of our website.',
    },
    {
      question: "How can I support the work of United Lives?",
      answer:
        "There are several ways you can support our mission: Contact us to learn more, Volunteer your time and skills, or Advocate for the Roma community.",
    },
    {
      question: "How can I contact United Lives?",
      answer:
        'You can reach us through the contact form on our "Contact Us" page or call us at +91 (044) 6050 7333.',
    },
    {
      question: "Is United Lives a registered non-profit organization?",
      answer:
        "Yes, we are a registered non-profit organization in India, committed to transparency and accountability in all our operations.",
    },
    {
      question: "How can I donate to United Lives?",
      answer:
        "We are currently working out a bank account with the Indian government to facilitate donations. In the meantime, please contact us directly to discuss how you can support our mission.",
    },
    {
      question: "How can I stay updated on the work of United Lives?",
      answer:
        "You can subscribe to our newsletter to receive regular updates on our projects, events, and news. The subscription form is available in the footer. You can also follow us on social media (if applicable).",
    },
    {
      question: "I have another question not listed here. How can I get in touch?",
      answer:
        'Please feel free to reach out to us through our "Contact Us" page, and we\'ll be happy to answer any questions you may have.',
    },
  ];

  const toggleExpand = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null); // Collapse if already expanded
    } else {
      setExpandedIndex(index); // Expand the clicked item
    }
  };

  return (
    <div className="faq-page">
      <h1 className="faq-title">Frequently Asked Questions (FAQ)</h1>
      <ul className="faq-list">
        {faqData.map((item, index) => (
          <li key={index} className="faq-item">
            <button
              className={`faq-question ${
                expandedIndex === index ? "expanded" : ""
              }`}
              onClick={() => toggleExpand(index)}
            >
              {item.question}
              <span className="faq-icon">
                {expandedIndex === index ? "-" : "+"}
              </span>
            </button>
            <div
              className={`faq-answer ${
                expandedIndex === index ? "expanded" : ""
              }`}
            >
              {item.answer}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQPage;