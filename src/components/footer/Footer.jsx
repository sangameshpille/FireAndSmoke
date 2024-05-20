import React, { useEffect, useState } from "react";

const footerStyle = {
  backgroundColor: "rgb(89, 90, 96)",
  padding: "16px",
  textAlign: "center",
  position: "relative",
  bottom: "0",
  left: "0",
  right: "0",
  width: "100%",
  zIndex: "100",
};

const linkStyle = {
  color: "rgb(255, 250, 245)",
  textDecoration: "none",
};

const hoverLinkStyle = {
  textDecoration: "underline",
};

const Footer = () => {
  const [isSticky, setIsSticky] = useState(false);

  const footerPositionStyle = isSticky
    ? { position: "sticky", bottom: "0px" }
    : {};
  let date = new Date().getFullYear();
  return (
    <footer style={{ ...footerStyle, ...footerPositionStyle }}>
      <div style={{ fontSize: "14px" }}>
        <p style={{ color: "rgb(182, 177, 161)" }}>
          &copy;{" "}
          <span style={{ color: "rgb(182, 177, 161)" }}>
            {" "}
            {date} Copyright:{" "}
          </span>
          <a href="http://www.mialotech.com/" style={linkStyle}>
            Mialo Technologies Pvt.Ltd
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
