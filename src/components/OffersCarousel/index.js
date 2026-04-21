import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class OffersCarousel extends Component {
  state = {
    offersList: [],
    offersApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getOffers()
  }

  getOffers = async () => {
    this.setState({offersApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.offers.map(each => ({
        imageUrl: each.image_url,
        id: each.id,
      }))
      this.setState({
        offersList: updatedData,
        offersApiStatus: apiStatusConstants.success,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="restaurants-offers-loader">
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  render() {
    const {offersList, offersApiStatus} = this.state
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      dotsClass: 'slick-dots custom-dots',
    }
    if (offersApiStatus === apiStatusConstants.inProgress) {
      return this.renderLoadingView()
    }
    return (
      <div className="carousel-container">
        <Slider {...settings}>
          {offersList.map(eachOffer => (
            <div key={eachOffer.id}>
              <img
                src={eachOffer.imageUrl}
                alt="offer"
                className="offer-image"
              />
            </div>
          ))}
        </Slider>
      </div>
    )
  }
}
export default OffersCarousel
