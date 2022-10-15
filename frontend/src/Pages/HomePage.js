import React from "react";
import { Navbar, RouteContent } from "../Components/index";

const HomePage = () => {
  return (
    <div className="container">
      <Navbar />
      <div>
        <RouteContent />
      </div>
    </div>
  );
};

export default HomePage;
