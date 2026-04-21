import {Link} from 'react-router-dom'
import {ImStarFull} from 'react-icons/im'

import './index.css'

const RestaurantCard = props => {
  const {details} = props
  const {id, imageUrl, name, userRating, cuisine} = details
  const {rating, totalReviews} = userRating
  return (
    <Link to={`/restaurant/${id}`} className="link-item">
      <li className="restaurant-list-item" data-testid="restaurant-item">
        <img src={imageUrl} className="restaurant-img" alt="restaurant" />
        <div className="restaurant-details">
          <h1 className="restaurant-heading">{name}</h1>
          <p className="cuisine">{cuisine}</p>
          <div className="rating-container">
            <ImStarFull className="star-icon" />
            <p className="rating">{rating}</p>
            <p className="reviews">({totalReviews} reviews)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default RestaurantCard
