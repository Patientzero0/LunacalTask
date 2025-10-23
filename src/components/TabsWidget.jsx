import React, { useState } from "react";
import { motion } from "framer-motion";

export default function TabsWidget() {
  const tabs = [
    {
      id: "about",
      title: "About Me",
      content:
        "Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now, helping businesses streamline their customer relationships and achieve better sales outcomes.I was born and raised in Albany, NY, and for the past 10 years, I’ve been living in Santa Carla with my wife, Tiffany, and our energetic 4-year-old twin daughters—Emma and Ella. Both of them are just starting school, so my calendar is usually blocked between 9–10 AM for our fun (and sometimes chaotic!) morning routine of breakfast, backpacks, and school drop-offs.Outside of work, I’m a big fan of hiking and photography—Santa Carla’s coastal trails are perfect for both. I also love trying out new coffee spots in town and watching weekend baseball games with my family. Professionally, I’m passionate about helping clients get the most out of Salesforce’s tools—whether that’s optimizing workflows, improving customer engagement, or finding creative ways to use data to drive growth.",
    },
    {
      id: "experiences",
      title: "Experiences",
      content:
        "Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now.\n\nI was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years my wife Tiffany and my 4 year old twin daughters- Emma and Ella. Both of them are just starting school, so my calender is usually blocked between 9-10 AM. This is a...",
    },
    {
      id: "recommended",
      title: "Recommended",
      content:
        "Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now.\n\nI was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years my wife Tiffany and my 4 year old twin daughters- Emma and Ella.",
    },
  ];

  const [selected, setSelected] = useState(0);

  const leftPercent = `${(selected / tabs.length) * 100}%`;
  const widthPercent = `${100 / tabs.length}%`;

  return (
    <div
      className="rounded-3xl shadow-2xl p-8 w-full"
      style={{
        backgroundColor: "#363C43",
        boxShadow: "5px 8px 25px rgba(0,0,0,0.6)",
        minHeight: "316px",
        maxWidth: "720px",
      }}
    >
      <div className="flex justify-center mb-8 px-2">
        <div
          role="tablist"
          aria-label="Profile sections"
          className="relative rounded-3xl p-2 flex items-center w-full"
          style={{
            backgroundColor: "#171717",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.8), inset 0 3px 8px rgba(0,0,0,0.6)",
            maxWidth: "597px",
            height: "49px",
          }}
        >
          <motion.div
            layoutId="tab-highlight"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute rounded-2xl"
            style={{
              left: `calc(0.5rem + ${selected * 33.333}%)`,
              width: "calc(33.333% - 0.5rem)",
              top: "0.5rem",
              bottom: "0.5rem",
              backgroundColor: "#28292F",
              boxShadow:
                "0 8px 20px rgba(0,0,0,0.7), inset 0 2px 4px rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.05)",
            }}
            aria-hidden="true"
          />
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setSelected(index)}
              role="tab"
              aria-selected={selected === index}
              aria-controls={`panel-${tab.id}`}
              className="relative z-10 flex-1 py-3.5 flex items-center justify-center text-base font-semibold rounded-2xl transition-colors duration-200"
              style={{
                color: selected === index ? "#FFFFFF" : "#A0A0A0",
              }}
              type="button"
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>
      <div
        className="relative overflow-y-auto px-2"
        style={{
          maxHeight: "150px",
          minHeight: "150px",
          scrollbarWidth: "thin",
        }}
      >
        <div
          id={`panel-${tabs[selected].id}`}
          role="tabpanel"
          className="space-y-4 pr-3"
        >
          <p
            className="text-base leading-relaxed whitespace-pre-line break-words"
            style={{ color: "#969696" }}
          >
            {tabs[selected].content}
          </p>
        </div>
      </div>
    </div>
  );
}