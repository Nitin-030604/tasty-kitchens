import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BiRupee} from 'react-icons/bi'
import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'
import PaymentSuccessful from '../PaymentSuccessful'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Cart extends Component {
  state = {
    cartList: [],
    placedOrder: false,
    cartListStatus: apiStatusConstants.inProgress,
  }

  componentDidMount() {
    this.getCartListFromLocalStorage()
  }

  getCartListFromLocalStorage = () => {
    const cartListData = JSON.parse(localStorage.getItem('cartData'))
    if (cartListData && cartListData.length > 0) {
      this.setState({
        cartList: cartListData,
        cartListStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({cartList: [], cartListStatus: apiStatusConstants.success})
    }
  }

  renderNoCartItemsView = () => (
    <div className="no-orders-container" data-testid="empty-cart">
      <img
        src="https://res.cloudinary.com/drykjbvie/image/upload/v1776065035/cooking_1_jg3pdb.png"
        alt="empty cart"
        className="no-orders-img"
      />
      <h1 className="no-orders-heading">No Order Yet!</h1>
      <p className="no-orders-desc">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/" className="link-btn">
        <button type="button" className="no-orders-btn">
          Order Now
        </button>
      </Link>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="cart-loader">
      <Loader type="TailSpin" color="#F7931E" height={30} width={30} />
    </div>
  )

  onUpdateQuantity = (id, value) => {
    const {cartList} = this.state
    const updatedList = cartList
      .map(each => {
        if (each.id === id) {
          const updatedQty = each.quantity + value
          return updatedQty > 0 ? {...each, quantity: updatedQty} : null
        }
        return each
      })
      .filter(item => item !== null)
    localStorage.setItem('cartData', JSON.stringify(updatedList))
    this.setState({cartList: updatedList})
  }

  onPlaceOrder = () => {
    this.setState({placedOrder: true})
    localStorage.setItem('cartData', JSON.stringify([]))
  }

  render() {
    const {cartList, placedOrder, cartListStatus} = this.state
    console.log(cartList, cartListStatus)
    const totalOrderCost = cartList.reduce(
      (acc, item) => acc + item.cost * item.quantity,
      0,
    )
    return (
      <>
        <Header />
        {placedOrder ? (
          <PaymentSuccessful />
        ) : (
          <>
            {cartListStatus === apiStatusConstants.inProgress ? (
              this.renderLoadingView()
            ) : (
              <>
                {cartList.length === 0 ? (
                  this.renderNoCartItemsView()
                ) : (
                  <>
                    <div className="cart-container">
                      <ul className="cart-list-container">
                        <li className="cart-list-item-header">
                          <p className="list-heading">Item</p>
                          <p className="list-heading">Quantity</p>
                          <p className="list-heading">Price</p>
                        </li>
                        {cartList.map(each => (
                          <CartItem
                            key={each.id}
                            det={each}
                            onUpdateQuantity={this.onUpdateQuantity}
                          />
                        ))}
                        <hr className="hr-line" />
                        <div className="total-container">
                          <h1 className="total-heading">Order Total:</h1>
                          <div className="total-price-and-btn">
                            <div className="price-tag">
                              <BiRupee
                                color="#3e4c59"
                                width={100}
                                height={100}
                                className="rupee-icon"
                              />
                              <p
                                data-testid="total-price"
                                className="total-price"
                              >
                                {totalOrderCost}.00
                              </p>
                            </div>
                            <button
                              type="button"
                              className="place-order-btn"
                              onClick={this.onPlaceOrder}
                            >
                              Place Order
                            </button>
                          </div>
                        </div>
                      </ul>
                    </div>
                    <Footer />
                  </>
                )}
              </>
            )}
          </>
        )}
      </>
    )
  }
}
export default Cart
