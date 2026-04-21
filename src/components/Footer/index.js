import {Component} from 'react'
import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

class Footer extends Component {
  render() {
    return (
      <>
        <div className="footer-container">
          <div className="logo-container">
            <img
              src="https://res.cloudinary.com/drykjbvie/image/upload/v1775820193/Group_7420_duivbm.png"
              className="website-footer-logo"
              alt="website-footer-logo"
            />
            <h1 className="website-footer-heading">Tasty Kitchens</h1>
          </div>
          <p className="website-footer-des">
            The only thing we are serious about is food. Contact us on
          </p>
          <div className="icon-container">
            <FaPinterestSquare className="icon" testid="pintrest-social-icon" />
            <FaInstagram className="icon" testid="instagram-social-icon" />
            <FaTwitter className="icon" testid="twitter-social-icon" />
            <FaFacebookSquare className="icon" testid="facebook-social-icon" />
          </div>
        </div>
      </>
    )
  }
}
export default Footer
