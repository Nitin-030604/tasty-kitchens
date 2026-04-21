import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import Header from '../Header'
import Footer from '../Footer'
import MenuItemCard from '../MenuItemCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {
    restaurantApiStatus: apiStatusConstants.initial,
    restaurantDetails: [],
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({restaurantApiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {Authorization: `Bearer ${token}`},
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updData = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        id: data.id,
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
        foodItems: data.food_items.map(each => ({
          cost: each.cost,
          foodType: each.food_type,
          id: each.id,
          imageUrl: each.image_url,
          name: each.name,
          rating: each.rating,
        })),
      }
      this.setState({
        restaurantApiStatus: apiStatusConstants.success,
        restaurantDetails: updData,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="restaurant-details-loader">
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  renderRestaurantBanner = () => {
    const {restaurantDetails} = this.state
    const {
      name,
      imageUrl,
      cuisine,
      rating,
      reviewsCount,
      costForTwo,
      location,
    } = restaurantDetails
    return (
      <div className="restaurant-banner-container">
        <div className="content">
          <img src={imageUrl} alt="restaurant" className="banner-image" />
          <div className="res-details">
            <h1 className="banner-name">{name}</h1>
            <p className="banner-cuisine">{cuisine}</p>
            <p className="banner-location">{location}</p>
            <div className="banner-stats">
              <div className="stat-item">
                <div className="stat-value-container">
                  <AiFillStar className="star-icon" />
                  <p className="stat-value">{rating}</p>
                </div>
                <p className="stat-label">{reviewsCount}+ Ratings</p>
              </div>
              <hr className="vertical-line" />
              <div className="stat-item">
                <div className="stat-value-container">
                  <BiRupee className="rupee-icon" />
                  <p className="stat-value">{costForTwo}</p>
                </div>
                <p className="stat-label">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {restaurantApiStatus, restaurantDetails} = this.state
    const menu = restaurantDetails?.foodItems
    return (
      <div className="restaurant-details-container">
        <Header />
        {restaurantApiStatus === apiStatusConstants.inProgress ? (
          this.renderLoadingView()
        ) : (
          <>
            {this.renderRestaurantBanner()}
            <ul className="food-items-list">
              {menu &&
                menu.map(each => (
                  <MenuItemCard key={each.id} menuDetails={each} />
                ))}
            </ul>
          </>
        )}
        <Footer />
      </div>
    )
  }
}
export default RestaurantDetails
