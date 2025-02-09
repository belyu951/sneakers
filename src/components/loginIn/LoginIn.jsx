import {React, useState} from 'react';
import { Link } from 'react-router-dom';



//импорт компонентов
import Header from '../headerBasket/Header'


//ипорт стилей
import '../../conteiner.scss'
import './loginin.scss'



//импорт иконок
import { TbDoorEnter } from "react-icons/tb";
import { VscSignIn } from "react-icons/vsc";

const LoginIn = () => {

    // const [value, setValue] = useState("");
    // const onChange = ({target: {value}}) => setValue(prev => /\d+/.test(Number(value)) ? value : prev);

    const [data, setData] = useState({
        ferstName: "",
        lastName: "",
        email: "",
        phone: "",
      });

      


       // Обработчик ввода
      const handleChangeGetFetch = (e) => {
        
        const { name, value } = e.target;

        if (name === "phone") {

            
            
            // Убираем все нецифровые символы, кроме "+"
            let formattedValue = value.replace(/[^\d+]/g, "");
      
            // Если номер начинается с +7 или 7, форматируем как +7(XXX) XXX-XX-XX
            if (formattedValue.startsWith("+7")) {
              formattedValue = formattedValue
                .replace(/^(\+7)(\d{3})(\d{0,3})(\d{0,2})(\d{0,2})/, "+7($2) $3-$4-$5")
                .slice(0, 17); // Ограничиваем длину до 16 символов (для формата +7(999) 999-99-99)
            }
        
            setData((prevData) => ({
              ...prevData,
              [name]: formattedValue, // Обновляем только поле phone
            }));
          } else {
            // Для других полей просто обновляем их без изменений
            setData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          }
        };

  
      

        // Сохранение данных на сервер
    const saveDataToFile = async () => {
        try {
        const response = await fetch("http://localhost:8080/save", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            console.log("Данные успешно сохранены!");
        } else {
            console.log("Ошибка при сохранении данных.");
        }
        } catch (error) {
        console.error("Ошибка:", error);
        console.log("Ошибка сети.");
        }
    };


    return (
        <>

<Header/>
        <div className="conteiner">
            <div className="blockRegistration">

                <div className="svgRegistration">
                    <div className="svgRegistration__circle"><TbDoorEnter className='svgRegistration__iconsSignUp'/></div>
                </div>

                <div className="blockRegistrationInput">
                    
                    

                    <div className="div">
                        <label className='blockRegistrationInput__label custom-field' aria-label="">
                            <input className='wan'  type="text" name="ferstName" value={data.ferstName} onChange={handleChangeGetFetch}/>
                            <span className="placeholder">ferst name</span>
                        </label>

                        <label className='blockRegistrationInput__label custom-field' aria-label="">
                            <input className='tu'  type="text" name="lastName" value={data.lastName} onChange={handleChangeGetFetch}/>
                            <span className="placeholder">last name</span>
                        </label>
                    </div>

                    <div className="div">
                        <label className='blockRegistrationInput__label custom-field' aria-label="">
                            <input className='fri' type="email" name="email" value={data.email} onChange={handleChangeGetFetch}/>
                            <span className="placeholder">Enter Email</span>
                        </label>
                    </div>

                    <div className="div Phone">
                        <label className='blockRegistrationInput__label custom-field' aria-label="">
                            <input className='fo' placeholder="+7(999) 999-99-99" type="phone" name="phone" value={data.phone} onChange={handleChangeGetFetch}/>
                            <span className="placeholder">phone</span>
                        </label>
                    </div>
                    
                </div>

                <div className="blockRegistrationButton">
                <Link to='/'> <button onClick={saveDataToFile} className="blockRegistrationButton__button">Login In <VscSignIn /></button></Link>
                <Link to='/'> <button className="blockRegistrationButton__button">you already have an account?<VscSignIn /></button> </Link>
                </div>
            </div>
        </div>


        
        </>
    );
};

export default LoginIn;