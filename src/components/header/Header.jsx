import React, { useEffect, useState } from "react";
import Logo from "../../assets/teaaa.png";
import Logo1 from "../../assets/logo.png";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidenavClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (
        !(
          e.target?.id === "openCloseMenu" ||
          e.target?.parentElement?.id === "openCloseMenu"
        )
      ) {
        setIsDropdownOpen(false);
      }

      let sidebarElement = document.getElementById("sidebar");
      let sidebarHamburgerElement =
        document.getElementById("hamburger-sidebar");
      if (
        e.target !== sidebarElement &&
        (!sidebarElement || !sidebarElement.contains(e.target)) &&
        e.target !== sidebarHamburgerElement &&
        (!sidebarHamburgerElement ||
          !sidebarHamburgerElement.contains(e.target))
      ) {
        setIsSidebarOpen(false);
      }
    });
  }, []);

  const handleLogoClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsDropdownOpen(false);
  };

  return (
    <header
      style={{
        backgroundColor: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px 25px",
        boxShadow:
          "0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.16)",
      }}
    >
      <div>
        <nav className="navbar-container">
          {/* SideNav slide-out button */}
          <div>
            <button
              onClick={handleSidenavClick}
              className="button-collapse-non-fixed"
              style={{ background: "none", border: "none", cursor: "pointer" }}
              id="hamburger-sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-menu font-medium-5"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
          {/*/. SideNav slide-out button */}
        </nav>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
      <nav>
        <div className="justify-content-center">
          <div>
            <img
              src={Logo}
              alt="hello"
              style={{ height: "auto", width: "100px" }}
            />
          </div>
        </div>
      </nav>

      <nav style={{ position: "relative" }}>
        <button
          type="button"
          style={{
            borderRadius: "50%",
            background: "none",
            border: "1px solid rgb(229,208,208)",
            padding: "9px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={handleLogoClick}
          id="openCloseMenu"
        >
          <img
            src={Logo1}
            alt="hello"
            style={{ height: "3vh", width: "auto", maxWidth: "40px" }}
            title="logout"
          />
        </button>
        {isDropdownOpen && (
          <div
            style={{
              position: "absolute",
              right: "10px",
              marginTop: "0px",
              backgroundColor: "white",
              padding: "8px",
              border: "1px solid rgb(217,217,217)",
              zIndex: "201",
            }}
          >
            <Link to="/">
              <button
                onClick={handleLogout}
                style={{
                  padding: "8px 10px",
                  color: "black",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (
                  (e.target.style.backgroundColor = "blue"),
                  (e.target.style.color = "white"),
                  (e.target.style.borderRadius = "2px")
                )}
                onMouseLeave={(e) => (
                  (e.target.style.backgroundColor = "transparent"),
                  (e.target.style.color = "black")
                )}
              >
                Log&nbsp;Out
              </button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
