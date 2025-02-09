import React, { useEffect } from 'react';

//импорт компонентов
import Header from '../headerBasket/Header';
import Slider from "react-slick";

// импорт стилей
import './home.scss'
import '../../conteiner.scss'

//импорт стилей слайдера
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";

// импорт иконок
import { FcLike } from "react-icons/fc";

// импорт redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../sneakersProductsSlice';
import { addToCart } from '../../basketSlice';

const Home = React.memo(() => {



  const dispatch = useDispatch();

  // Извлекаем данные из Redux и обрабатываем их
  const { items, status, error } = useSelector((state) => state.products);
  




  useEffect(() => {
    // Загружаем продукты только если статус 'idle'
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

 

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));  // Добавляем товар в корзину
  };

  // Показать сообщение о загрузке, если данные загружаются
  if (status === 'loading') return <div>Loading...</div>;

  // Показать ошибку, если она есть
  if (status === 'failed') return <div>{error}</div>;

  // настройки слайдера
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };


// лимит из 4 карточек для кешбэка
  let itemsCashBack = [...items].sort(() => 0.5 - Math.random()).slice(0, 4)

  return (
    <>
        <Header />
       <div className="conteiner">
        <div className="cardsCashBack">
            <h1 className='cardsCashBack__informationCashBack'>cashback : from 5% to 20%</h1>

        <div className="cardsCashBack__itemsCashBack">
            {itemsCashBack.map((sneakers)=>{
        let randomCashBack = (Math.random() * (20 - 5) + 5).toFixed(0)
        let cashBackReturn = (sneakers.price / 100 * randomCashBack).toFixed(0)
        return(
        <div key={sneakers.id} className="carts">
            <div className="sneakersImages">
                <div className="sneakersImages__grid">
                    <div className="sneakersImages__slider">
                        <FcLike onClick={()=> handleAddToCart(sneakers)} className='sneakersImages__like' />
                            <Slider {...settings}>
                                {sneakers.informationImages.images.map((imageses)=>(
                                    <div key={sneakers.id} className="sneakersImages__img">
                                        <img className='sneakersImages__images' src={imageses} alt="" />
                                    </div>
                                ))}
                            </Slider>
                    </div>
                    <div className="sneakersImages__color">
                        {sneakers.informationImages.colorPhotoSneakers.map((sneakersColor, indx)=>(
                            // setColorImages(sneakersColor)
                            <img key={indx} className='sneakersImages__colors' src={sneakersColor} alt="" />
                        ))}
                        
                    </div>
                </div>
            </div>

            <div className="sneakersInformation">
                <div className="sneakersInformation__title">
                    <h2 className='sneakersInformation__titles'>{sneakers.title}</h2>
                </div>
                <div className="sneakersInformation__explanation">
                    <h5 className='sneakersInformation__explanations'>{sneakers.explanationOfTheName}</h5>
                </div>
                <div className="sneakersInformation__size"></div>

                <div className="sneakersInformation__blockPrice">
                <span className='sneakersInformation__prices'>{sneakers.price}</span>

                    <div className="sneakersInformation__blockCashBack">
                        
                        <span className="sneakersInformation__bonus">{randomCashBack}%</span>
                        <span className="sneakersInformation__cashBack">{cashBackReturn}</span>
                    </div>
                </div>
            </div>
        </div>
        )
        })}

        </div>
        </div>



        <div className="cardsDiscounts">
            <h1 className='cardsCashBack__informationCashBack'>Discounts : from 20% to 50%</h1>

        <div className="cardsCashBack__itemsCashBack">
            {itemsCashBack.map((sneakers)=>{
                let randomPriceSneakers = (Math.random() * (20000 - 8000) + 8000).toFixed(0)
                let randomCashBack = (Math.random() * (50 - 20) + 20).toFixed(0)
                // let cashBackReturn = (randomCashBack / 100 * randomPriceSneakers).toFixed(0)
                let returnDiscounts = (randomPriceSneakers - (randomCashBack / 100) * randomPriceSneakers).toFixed(0)
        return(
        <div key={sneakers.id} className="carts">
            <div className="sneakersImages">
                <div className="sneakersImages__grid">
                    <div className="sneakersImages__slider">
                        <FcLike onClick={()=> handleAddToCart(sneakers)} className='sneakersImages__like' />
                            <Slider {...settings}>
                                {sneakers.informationImages.images.map((imageses)=>(
                                    <div key={sneakers.id} className="sneakersImages__img">
                                        <img className='sneakersImages__images' src={imageses} alt="" />
                                    </div>
                                ))}
                            </Slider>
                    </div>
                    <div className="sneakersImages__color">
                        {sneakers.informationImages.colorPhotoSneakers.map((sneakersColor, indx)=>(
                            <img key={indx} className='sneakersImages__colors' src={sneakersColor} alt="" />
                        ))}
                        
                    </div>
                </div>
            </div>

            <div className="sneakersInformation">
                <div className="sneakersInformation__title">
                    <h2 className='sneakersInformation__titles'>{sneakers.title}</h2>
                </div>
                <div className="sneakersInformation__explanation">
                    <h5 className='sneakersInformation__explanations'>{sneakers.explanationOfTheName}</h5>
                </div>
                <div className="sneakersInformation__size"></div>

                <div className="sneakersInformation__blockPrice">
                <span className='sneakersInformation__prices'>{randomPriceSneakers}</span>

                    <div className="sneakersInformation__blockCashBack">
                        
                        <span className="sneakersInformation__bonus">-{randomCashBack}%</span>
                        <span className="sneakersInformation__cashBack">{returnDiscounts}</span>
                    </div>
                </div>
            </div>
        </div>
        )
        })}

        </div>
        </div>
            
        <div className="sneakersCarts">
       {items.map((sneakers)=>{
        let randomCashBack = (Math.random() * (20 - 5) + 5).toFixed(0)
        let cashBackReturn = (sneakers.price / 100 * randomCashBack).toFixed(0)
        return(
        <div key={sneakers.id} className="carts">
            <div className="sneakersImages">
                <div className="sneakersImages__grid">
                    <div className="sneakersImages__slider">
                        <FcLike onClick={()=> handleAddToCart(sneakers)} className='sneakersImages__like' />
                            <Slider {...settings}>
                                {sneakers.informationImages.images.map((imageses)=>(
                                    <div key={sneakers.id} className="sneakersImages__img">
                                        <img className='sneakersImages__images' src={imageses} alt="" />
                                    </div>
                                ))}
                            </Slider>
                    </div>
                    <div className="sneakersImages__color">
                        {sneakers.informationImages.colorPhotoSneakers.map((sneakersColor, indx)=>(
                            <img key={indx} className='sneakersImages__colors' src={sneakersColor} alt="" />
                        ))}
                        
                    </div>
                </div>
            </div>

            <div className="sneakersInformation">
                <div className="sneakersInformation__title">
                    <h2 className='sneakersInformation__titles'>{sneakers.title}</h2>
                </div>
                <div className="sneakersInformation__explanation">
                    <h5 className='sneakersInformation__explanations'>{sneakers.explanationOfTheName}</h5>
                </div>
                <div className="sneakersInformation__size"></div>

                <div className="sneakersInformation__blockPrice">
                <span className='sneakersInformation__prices noneColorPrices'>{sneakers.price}</span>

                    <div className="sneakersInformation__blockCashBack">
                        
                        <span className="sneakersInformation__bonus">{randomCashBack}%</span>
                        <span className="sneakersInformation__cashBack">{cashBackReturn}</span>
                    </div>
                </div>
            </div>
        </div>
        )
        })}
            
       </div>
    </div>
    </>
  );
});

export default Home;
