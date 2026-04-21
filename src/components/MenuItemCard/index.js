import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import './index.css'

class MenuItemCard extends Component {
  state = {quantity: this.getInitialQuantity()}

  getInitialQuantity() {
    const {menuDetails} = this.props
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const cartItem = cartData.find(each => each.id === menuDetails.id)
    return cartItem ? cartItem.quantity : 0
  }

  updateCartData = newQuantity => {
    const {menuDetails} = this.props
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const itemIndex = cartData.findIndex(each => each.id === menuDetails.id)

    if (itemIndex > -1) {
      if (newQuantity > 0) {
        cartData[itemIndex].quantity = newQuantity
      } else {
        cartData.splice(itemIndex, 1)
      }
    } else if (newQuantity > 0) {
      const newItem = {
        cost: menuDetails.cost,
        quantity: newQuantity,
        id: menuDetails.id,
        imageUrl: menuDetails.imageUrl,
        name: menuDetails.name,
      }
      cartData.push(newItem)
    }

    localStorage.setItem('cartData', JSON.stringify(cartData))
    this.setState({quantity: newQuantity})
  }

  onIncrement = () => {
    this.setState(prevState => {
      const newQty = prevState.quantity + 1
      this.updateCartData(newQty)
      return {quantity: newQty}
    })
  }

  onDecrement = () => {
    this.setState(prevState => {
      if (prevState.quantity > 0) {
        const newQty = prevState.quantity - 1
        this.updateCartData(newQty)
        return {quantity: newQty}
      }
      return null
    })
  }

  render() {
    const {menuDetails} = this.props
    const {name, cost, rating, imageUrl} = menuDetails
    const {quantity} = this.state

    return (
      <li className="menu-item" data-testid="foodItem">
        <img src={imageUrl} alt="food item" className="menu-item-image" />
        <div className="menu-item-details">
          <h1 className="menu-item-name">{name}</h1>
          <div className="cost-container">
            <BiRupee />
            <p className="cost">{cost}</p>
          </div>
          <div className="rating-container">
            <AiFillStar className="star-icon" />
            <p className="rating-value">{rating}</p>
          </div>
          {quantity === 0 ? (
            <button
              type="button"
              className="add-button"
              onClick={this.onIncrement}
            >
              Add
            </button>
          ) : (
            <div className="quantity-container">
              <button
                type="button"
                onClick={this.onDecrement}
                data-testid="decrement-count"
                className="inc-dec-button"
              >
                -
              </button>
              <span data-testid="active-count" className="quantity">
                {quantity}
              </span>
              <button
                type="button"
                onClick={this.onIncrement}
                data-testid="increment-count"
                className="inc-dec-button"
              >
                +
              </button>
            </div>
          )}
        </div>
      </li>
    )
  }
}

export default MenuItemCard
