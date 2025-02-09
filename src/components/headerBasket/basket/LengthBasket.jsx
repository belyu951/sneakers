import React from 'react';
import { useSelector,  } from 'react-redux';


const LengthBasket = () => {


    const cartItems = useSelector((state) => state.cart.items);
    
    // let itemCount = cartItems.length;
    console.log('cartItems:', cartItems);
    return (
        <div>
            <span> {cartItems === 0 ? '' : `товаров в корзине : ${cartItems}`} </span>
        </div>
    );
};

export default LengthBasket;