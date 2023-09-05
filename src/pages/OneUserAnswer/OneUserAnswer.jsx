import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from 'axios';



const OneUserAnswer = () => {

    const {title, name, id} = useParams()

    const [questions, setQuestions] = useState([])

    const [answer, setAnswer] = useState({})

    const [] = useState([])

    useEffect(() => {
        axios(`http://localhost:4444/questions?category=${title}`)
            .then(({data}) => setQuestions(data))
        axios(`http://localhost:4444/answers/${id}`)
            .then(({data}) => setAnswer(data))
    })

    if (questions.length && 'name' in answer) {
        return (
            <div style={{paddingLeft: '50px'}}>
                <h2>Ответы {name} по {title}</h2>

                {
                    questions.map((item) => (
                        <div key={item.question}>
                            <h2>{item.question}</h2>

                            <ul>
                                {
                                    item.options.map((el) => (
                                        <li style={{background: el.correct ? 'green' : JSON.parse(answer[item.question]).text === el.text ? 'red' : 'transparent'}} key={el.text}>
                                            <label>
                                                <input value={el.correct}
                                                       defaultChecked={JSON.parse(answer[item.question]).text === el.text}
                                                       disabled
                                                       name={item.question}
                                                       type="radio"/>
                                                {el.text}
                                            </label>
                                        </li>
                                    ))
                                }
                            </ul>



                        </div>
                    ))
                }
            </div>
        );
    } else {
        return <h2>Loading...</h2>
    }


};

export default OneUserAnswer;