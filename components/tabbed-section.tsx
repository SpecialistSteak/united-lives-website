"use client";

import React, { useState } from 'react';
import "@/styles/tabbed-section.css";
import { TabContent } from "@/types/tab-content";

const TabbedSection = () => {
  const [activeTab, setActiveTab] = useState('work');

  const tabContent: TabContent = {
    work: {
      title: "Our Work",
      content: "United Lives works tirelessly to advocate for the rights of Gypsy, Roma and Traveller communities. We provide legal support, education initiatives, and community outreach programs.",
      url: "/our-work"
    },
    vision: {
      title: "Our Vision",
      content: "We envision a society where Gypsy, Roma and Traveller people are treated with respect and have equal opportunities in all aspects of life.",
      url: "/our-vision"
    },
    values: {
      title: "Core Values",
      content: "Equality, Respect, Diversity, and Empowerment form the foundation of our organization and guide all our actions and decisions.",
      url: "/core-values"
    }
  };

  return (
    <div className="ul-tabbed-section">
      <div className="ul-tabs">
        {Object.keys(tabContent).map((tab) => (
          <button
            key={tab}
            className={`ul-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tabContent[tab as keyof TabContent].title}
          </button>
        ))}
      </div>
      <div className="ul-tab-content">
        <h3>{tabContent[activeTab].title}</h3>
        <p>{tabContent[activeTab].content}</p>
        <a href={tabContent[activeTab].url} className="ul-button tabbed-section-button">Learn More</a>
      </div>
    </div>
  );
};

export default TabbedSection;