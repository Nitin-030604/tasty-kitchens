import {Link, withRouter, useLocation} from 'react-router-dom'
import {useState} from 'react'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoMdClose} from 'react-icons/io'

import './index.css'

const Header = props => {
  const [isMenuOpen, setIsmenuOpen] = useState(false)
  const toggleMenu = () => setIsmenuOpen(!isMenuOpen)
  const {history} = props
  const onClickLogout = () => {
    history.replace('/login')
    Cookies.remove('jwt_token')
  }
  const location = useLocation()
  return (
    <>
      <nav className="nav-header">
        <div className="nav-content">
          <Link to="/" className="logo-link">
            <div className="logo">
              <img
                src="https://res.cloudinary.com/drykjbvie/image/upload/v1774845194/Frame_274_xndfuv.png"
                className="website-logo"
                alt="website logo"
              />
              <h1 className="website-name">Tasty Kitchens</h1>
            </div>
          </Link>
          <button type="button" className="hamburger-btn" onClick={toggleMenu}>
            <GiHamburgerMenu size={25} />
          </button>
          <div className="menu">
            <ul className="nav-menu">
              <Link
                to="/"
                className={
                  location.pathname === '/' ? 'active-nav-item' : 'nav-item'
                }
              >
                <li>Home</li>
              </Link>
              <Link
                to="/cart"
                className={
                  location.pathname === '/cart' ? 'active-nav-item' : 'nav-item'
                }
              >
                <li>Cart</li>
              </Link>
            </ul>
            <button
              type="button"
              className="logout-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="mobile-menu-popup">
          <ul className="mobile-nav-list">
            <Link to="/" className="nav-item">
              <li>Home</li>
            </Link>
            <Link to="/cart" className="nav-item">
              <li>Cart</li>
            </Link>
            <button
              type="button"
              className="logout-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </ul>
          <button type="button" className="close-btn" onClick={toggleMenu}>
            <IoMdClose size={20} />
          </button>
        </div>
      )}
    </>
  )
}
export default withRouter(Header)
