import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFilterLeft} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'
import OfferCarousel from '../OffersCarousel'
import RestaurantCard from '../RestaurantCard'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    restaurantsListApiStatus: apiStatusConstants.initial,
    restaurantsList: [],
    activeOptionId: sortByOptions[1].value,
    activePage: 1,
    searchInput: '',
  }

  componentDidMount() {
    this.getRestaurants()
  }

  getRestaurants = async () => {
    this.setState({restaurantsListApiStatus: apiStatusConstants.inProgress})
    const {activeOptionId, activePage, searchInput} = this.state
    const token = Cookies.get('jwt_token')
    const limit = 9
    const offset = (activePage - 1) * limit
    const url = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${limit}&sort_by_rating=${activeOptionId}`
    const options = {
      headers: {Authorization: `Bearer ${token}`},
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.restaurants.map(each => ({
        costForTwo: each.cost_for_two,
        cuisine: each.cuisine,
        groupByTime: each.group_by_time,
        hasOnlineDelivery: each.has_online_delivery,
        hasTableBooking: each.has_table_booking,
        id: each.id,
        imageUrl: each.image_url,
        isDeliveringNow: each.is_delivering_now,
        location: each.location,
        menuType: each.menu_type,
        name: each.name,
        opensAt: each.opens_at,
        userRating: {
          rating: each.user_rating.rating,
          ratingColor: each.user_rating.rating_color,
          ratingText: each.user_rating.rating_text,
          totalReviews: each.user_rating.total_reviews,
        },
      }))
      this.setState({
        restaurantsListApiStatus: apiStatusConstants.success,
        restaurantsList: updatedData,
      })
    } else {
      this.setState({restaurantsListApiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSortBy = event => {
    this.setState({activeOptionId: event.target.value}, this.getRestaurants)
  }

  onClickDecrement = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        this.getRestaurants,
      )
    }
  }

  onClickIncrement = () => {
    const {activePage} = this.state
    if (activePage < 20) {
      this.setState(
        prevState => ({activePage: prevState.activePage + 1}),
        this.getRestaurants,
      )
    }
  }

  renderLoadingView = () => (
    <div data-testid="restaurants-list-loader" className="loader-container">
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  render() {
    const {
      activeOptionId,
      activePage,
      restaurantsListApiStatus,
      restaurantsList,
    } = this.state
    return (
      <>
        <Header />
        <div className="home-content-container">
          <div className="home-content">
            <OfferCarousel />
            <div className="restaurants-content">
              <div className="restaurants-header">
                <h1 className="res-header-heading">Popular Restaurants</h1>
                <div className="desc-sortby">
                  <p className="res-header-desc">
                    Select your favourite restaurant special dish and make your
                    day happy...
                  </p>
                  <div className="filter-container">
                    <BsFilterLeft className="filter-icon" />
                    <p className="sort-by">Sort By</p>
                    <select
                      className="sort-select"
                      value={activeOptionId}
                      onChange={this.onChangeSortBy}
                    >
                      {sortByOptions.map(each => (
                        <option key={each.id} value={each.value}>
                          {each.displayText}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <hr className="hr-line" />
              {restaurantsListApiStatus === apiStatusConstants.inProgress ? (
                this.renderLoadingView()
              ) : (
                <ul className="restaurants-list">
                  {restaurantsList.map(each => (
                    <RestaurantCard key={each.id} details={each} />
                  ))}
                </ul>
              )}
              <div className="pagination-container">
                <button
                  type="button"
                  onClick={this.onClickDecrement}
                  className="pagination-btn"
                  data-testid="pagination-left-button"
                >
                  &lt;
                </button>
                <div className="pagination-number">
                  <span data-testid="active-page-number">{activePage}</span>
                  <span> of 20</span>
                </div>
                <button
                  type="button"
                  onClick={this.onClickIncrement}
                  className="pagination-btn"
                  data-testid="pagination-right-button"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    )
  }
}
export default Home
