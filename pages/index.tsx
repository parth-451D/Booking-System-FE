import Navbar from "@/src/components/Header";
import Home from "@/src/components/Home";
import { Inter } from "next/font/google";
import HomePage from "./home";

const inter = Inter({ subsets: ["latin"] });

export default function App() {
  return (
    <div className="app">
      <HomePage />
    </div>
  );
}
