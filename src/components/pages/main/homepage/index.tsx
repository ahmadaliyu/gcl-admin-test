import React from "react";
import "./style.css";
import LoginPage from "../../auth/login";

function Homepage() {
  return (
    <>
      {/* HEADER */}
      <div className="max-screen-wrapper bg-[#fff] relative">
        <LoginPage />
      </div>
    </>
  );
}

export default Homepage;
