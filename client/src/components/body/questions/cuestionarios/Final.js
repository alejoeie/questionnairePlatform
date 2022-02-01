import React, {useState, useEffect} from 'react'
import { formatTime } from './utils/index';
function Final({ results, data, onReset, onAnswersCheck, time}) {

    const [correctAnswer, setCorrectAnswer] = useState(0);

    useEffect(() => {
        let correct = 0;
        results.forEach((result, index) => {
            if(result.a === data[index].answer) {
                correct++;
            }
        });
        setCorrectAnswer(correct);
    }, [])
    return (
        <div className="card">
            <div className="card-content">
                <div className="content">
                    <h3>Tus resultados</h3>
                    <p>{correctAnswer} de {data.length}</p>
                    <p><strong>{Math.floor((correctAnswer / data.length) * 100)}%</strong></p>
                    <p><strong>Su tiempo: </strong>{formatTime(time)}</p>
                    <button className="button is-info mr-2" onClick={onAnswersCheck}>Revisa tus respuestas</button>
                    <button className="button is-success" onClick={onReset}>Intentar de nuevo</button>
                </div>
            </div>
            
        </div>
    )
}

export default Final;
