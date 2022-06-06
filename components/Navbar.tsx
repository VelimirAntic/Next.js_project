import { useRouter } from "next/router";
import React from "react";
import Button from "./Button";
import NavLink from "./NavLink";

const Navbar = () => {
  const { pathname } = useRouter();
  const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME;

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            {businessName}
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarSupportedContent"
          >
            <div className="mr-auto" />

            <ul className="navbar-nav my-2 my-lg-0">
              {pathname !== "/app" && (
                <li className="nav-item me-2">
                  <Button className="btn-sm" to="/app">
                    Generate Collection
                  </Button>
                </li>
              )}
              <li className="nav-item">
                <NavLink className="nav-link" to="/#features-section">
                  Features
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/#pricing-section">
                  Pricing
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
