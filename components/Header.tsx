import Image from "next/image";
import React from "react";
import headerRight from "../assets/home/header-right.png";
import Button from "./Button";

const Header = () => {
  return (
    <header className="header-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 left">
            <h1>
              Create NFT Collections <br /> Easily With <span>No Code</span>
            </h1>
            <div className="mb-5">
              <p>
                Turn image layers into thousands of uniquely code generated
                atworks.
              </p>
              <p>Get ready to sell your own collections.</p>
            </div>

            <Button theme="white" to="/app">
              Get Started
            </Button>
          </div>

          <div className="col-5 right d-none d-lg-block">
            <div className="img">
              <Image src={headerRight} alt="header-right" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
