import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LengthBasket from './basket/LengthBasket'


//импорт стили
import './header.scss'





//импорт reactIcons
import { CiLocationOn } from "react-icons/ci";
import { SiShopify } from "react-icons/si";
import { CiShoppingBasket } from "react-icons/ci";
import { VscSignIn } from "react-icons/vsc";

const Header = () => {

  
    
    



let [location, setLocation] = useState(null)
let [error, setError] = useState(null)
let [data, setData] = useState(null)
let [locationName, setLocationName] = useState('вы не указали местоположения')




const requestGeolocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
                setError(null);
                const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=fdd66855-e770-477a-a467-83f7d1d3333b&geocode=${longitude},${latitude}&format=json`);
              const json = await response.json();
                // console.log(json.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.AdministrativeAreaName)
                setData(json.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.AdministrativeAreaName)
                
            },
            (err) => {
                if (err.code === 1) {
                    setError('Доступ к геолокации был отклонен пользователем.');
                } else if (err.code === 2) {
                    setError('Местоположение недоступно.');
                } else if (err.code === 3) {
                    setError('Тайм-аут при запросе геолокации.');
                } else {
                    setError('Произошла неизвестная ошибка.');
                }
                setLocation(null);
            }
        );
    } else {
        setError('Геолокация не поддерживается вашим браузером.');
    }
    
};



useEffect(()=>{
    
setTimeout(()=>{
    requestGeolocation()
},1000)

},[])
    return (
        <>
        <div className="bas">
                <header className="header">
                    <div className="location">
                        <button onClick={requestGeolocation} className="location__button">
                            <span className="location__svg"><CiLocationOn/></span>
                            <span  className="location__name">{ !data ? locationName : data}</span>
                        </button>
                    </div>
                    <div className="logo">
                        <Link className="logo__link" to='/'>
                            <SiShopify/><p className="logo__name">Sneakers Shop</p>
                        </Link>
                    </div>
                    <div className="users">
                    <Link className='users__link' to='/loginIn'><button type="" className="users__loginIn">войти<VscSignIn /></button></Link>
                    </div>
                </header>

                
            <div className="home">
            <Link to='/basketPurchase'>
                <div className="home__grid">
                    <CiShoppingBasket className="home__basket"/>
                    <LengthBasket />
                </div>
                </Link>
            </div>
            
        </div>

        
        
        </>
    );
};

export default Header;