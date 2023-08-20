import React, { useEffect, useRef, useState } from 'react';
import './header.css'; // Import your CSS file
import { useSelector } from 'react-redux';

const pages = ['Products', 'Orders', 'Cart'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header() {
  const {
    isauthenticated,
    user
  } = useSelector((state) => state.user);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const menuRef = useRef(null); // Add a ref to the menu container

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    const handleClickOutsideMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        handleCloseNavMenu();
      }
    };

    window.addEventListener('touchend', handleClickOutsideMenu);

    return () => {
      window.removeEventListener('touchend', handleClickOutsideMenu);
    };
  }, []);

  return (
    <div className="app-bar">
      <div className="container" >
        <div className="toolbar">
          <h2 className="logo">
            <a href="/" className="logo-link">
              Komars
            </a>
          </h2>

          <div className='mobile-menu'  ref={menuRef}>
            <button
              className="menu-button"
              onClick={handleOpenNavMenu}
              aria-label="Open navigation menu"
            >
              Menu
            </button>
            <div
              className={`menu-dropdown ${anchorElNav ? 'open' : ''}`}
              onClick={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <a href={`/${page}`} key={page} className="menu-item">
                  {page}
                </a>
              ))}
            </div>
          </div>

          <div className="search">
            {/* Include your Search component here */}
          </div>

          <div className="desktop-menu">
            {pages.map((page) => (
              <a href={`/${page}`} key={page} className="menu-item">
                {page}
              </a>
            ))}
            <h3 className="user-info">
           {
!isauthenticated? <p style={{
  cursor:'pointer',
  color:'white',
 paddingTop:'20px',
  fontWeight:'semi-bold',
  fontSize:'15px',


}}>hello , {user?.name}</p> : <>Login</>
           }
          </h3>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default Header;
