import React, { useEffect } from "react";
import TabsWidget from "../components/TabsWidget";
import GalleryWidget from "../components/GalleryWidget";

export default function Home() {
	useEffect(() => {
		console.log("Home mounted");
	}, []);

	return (
		<div className="min-h-screen flex bg-gray-100" role="main">
			<div className="w-1/2 hidden md:block" aria-hidden="true"></div>
			<div className="w-full md:w-1/2 flex flex-col gap-6 p-8">
				<TabsWidget />
				<GalleryWidget />
			</div>
		</div>
	);
}
