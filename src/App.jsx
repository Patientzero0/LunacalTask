import React from "react";
import "./index.css";
import TabsWidget from "./components/TabsWidget";
import GalleryWidget from "./components/GalleryWidget";

export default function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#343332' }}>
      <div className="min-h-screen flex">
        <div
          className="hidden md:block md:w-1/2 bg-transparent"
          aria-hidden="true"
        ></div>
        <div className="w-full md:w-1/2 flex flex-col items-stretch justify-start gap-6 p-6 md:p-8">
          <div className="w-full">
            <TabsWidget />
          </div>
          <div className="w-full">
            <GalleryWidget />
          </div>
        </div>
      </div>
    </div>
  );
}