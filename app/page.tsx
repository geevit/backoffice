import "@geevit/app/globals.css";
import { Navbar } from "@geevit/components/Navbar";
import localFont from "next/font/local";

export default function Home() {
    return (
        <div className="bg-leaf flex w-screen h-screen p-4">
            <Navbar />
            <div className="w-[85%] bg-white rounded-xl"></div>
        </div>
    );
}
