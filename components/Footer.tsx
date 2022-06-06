import React from "react";
import NavLink from "./NavLink";

interface FooterProps {}

const Footer = (props: FooterProps) => {
  const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME;

  return (
    <footer className="footer pt-5">
      <div className="container-lg">
        <div className="row">
          <div className="col-md-6">
            <ul className="list-unstyled">
              <li>
                <NavLink to="/privacy-policy">Privacy policy</NavLink>
              </li>
              <li>
                <NavLink to="/terms-of-use">Terms of use</NavLink>
              </li>
            </ul>
          </div>

          <div className="col-md-6 text-end">
            <p>
              &copy;{new Date().getFullYear()} All Right Reserved {businessName}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
