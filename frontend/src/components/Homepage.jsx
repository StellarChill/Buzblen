import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Homepage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto p-4">
        <h1 className="text-xl font-bold">Welcome to the Homepage</h1>
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
