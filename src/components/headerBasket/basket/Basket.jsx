// src/components/Cart.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../../../basketSlice';

const Basket = React.memo(() => {
  
  const cartItems = useSelector((state) => state.cart.items);

 
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart({ id }));
  };


  const handleClearCart = () => {
    dispatch(clearCart());
  };

  

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                
                  <>
                    <p>{item.title}</p>
                    <p>{item.price}</p>
                  </>
                
                <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <button onClick={handleClearCart}>Clear Cart</button>
          
        </div>
      )}
    </div>
  );
});

export default Basket;
