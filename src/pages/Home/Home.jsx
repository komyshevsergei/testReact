import {useEffect} from "react";
import axios from "axios"
import React, {useState} from "react"
import {useNavigate, Link} from 'react-router-dom'
// import './home.css'
import styles from './home.module.css'



const Home = () => {

    const [test, setTest] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
      async function fetchTests() {
         try {
             const response = await axios('http://localhost:4444/tests')
             setTest(response.data)
         } catch (err) {
             console.error('Error fetching tests: ' + err)
         }
      }
         fetchTests();
    }, [])

    return (
        <div>
           <h1 className={styles.heading}>Приветствуем на нашем сайте</h1>

            <h2 className={styles.subHeading}>Выберите тест который хотите пройти</h2>



            <div className={styles.cardContainer}>
                {
                    test.map((item) => (
                        <div className={styles.card} key={item.id}>
                            <img className={styles.image} onClick={() => navigate(`test/${item.title}`)} src={item.image} alt={`${item.title} preview`}/>

                            <h3 className={styles.title}>{item.title}</h3>
                        </div>
                    ))
                }
            </div>

            <Link to='/answers' className={styles.link}>Посмотреть ответы</Link>
        </div>
    );
};

export default Home;