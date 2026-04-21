import {BiRupee} from 'react-icons/bi'

import './index.css'

const CartItem = props => {
  const {det, onUpdateQuantity} = props
  const {imageUrl, name, quantity, cost, id} = det
  const onUpdate = value => {
    onUpdateQuantity(id, value)
  }
  return (
    <>
      <li className="cart-item" data-testid="cartItem">
        <div className="img-name-container">
          <img src={imageUrl} className="cart-item-image" alt="cart-image" />
          <h1 className="cart-item-name">{name}</h1>
        </div>
        <div className="cart-quantity-container">
          <button
            type="button"
            data-testid="decrement-quantity"
            className="cart-inc-dec-button"
            onClick={() => onUpdate(-1)}
          >
            -
          </button>
          <p data-testid="item-quantity" className="cart-item-quantity">
            {quantity}
          </p>
          <button
            type="button"
            data-testid="increment-quantity"
            className="cart-inc-dec-button"
            onClick={() => onUpdate(1)}
          >
            +
          </button>
        </div>
        <div className="price">
          <BiRupee
            color="#ffa412"
            width={40}
            height={40}
            className="rupee-icon"
          />
          <p className="cart-item-price">{quantity * cost}.00</p>
        </div>
      </li>
      <li className="mobile-cart-item" data-testid="cartItem">
        <img
          src={imageUrl}
          alt="cart-image"
          className="mobile-cart-item-image"
        />
        <div className="mobile-details-container">
          <h1 className="mobile-cart-item-name">{name}</h1>
          <div className="mobile-cart-quantity-container">
            <button
              type="button"
              data-testid="decrement-quantity"
              className="mobile-cart-inc-dec-button"
              onClick={() => onUpdate(-1)}
            >
              -
            </button>
            <p data-testid="item-quantity" className="cart-item-quantity">
              {quantity}
            </p>
            <button
              type="button"
              data-testid="increment-quantity"
              className="mobile-cart-inc-dec-button"
              onClick={() => onUpdate(1)}
            >
              +
            </button>
          </div>
          <div className="mobile-price">
            <BiRupee
              color="#ffa412"
              width={60}
              height={60}
              className="rupee-icon"
            />
            <p className="mobile-cart-item-price">{quantity * cost}.00</p>
          </div>
        </div>
      </li>
    </>
  )
}
export default CartItem
