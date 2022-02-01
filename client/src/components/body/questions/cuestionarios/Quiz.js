import React, {useState, useEffect, useRef} from 'react'

const Quiz = ({current, onAnswerUpdate, numberOfQuestions, activeQuestion, onSetActiveQuestion, onSetStep}) => {

    const [selected, setSelected] = useState('');
    const [error, setError] = useState('');
    const radiosWrapper = useRef();

    useEffect(() => {
        const findCheckedInput = radiosWrapper.current.querySelector('input:checked');
        if(findCheckedInput) {
            findCheckedInput.checked = false;
        }
    },[current])

    const changeHandler = (e) => {
        setSelected(e.target.value);
        if(error){
            setError('');
        }
    }
    const nextClickHandler = (e) => {
        if(selected === ''){
            return setError('Por favor seleccione una opcion');
        }
        onAnswerUpdate(prevstate => [...prevstate, {q: selected.question, a: selected}]);
        setSelected('');
        if(activeQuestion < numberOfQuestions-1){
            onSetActiveQuestion(activeQuestion + 1);
        }else{
            onSetStep(3);
        }
        

    }

    return (
        <div className="card">
            <div className="card-content">
                <div className="content">
                    <h2 className="mb-5">{current.question}</h2>
                    <div className="control" ref={radiosWrapper}>
                       {current.choices.map((current, key) => (
                        <label  className="radio has-background-light" key={key}>
                            <input type="radio" name="answer" value={current} onChange={changeHandler}></input>
                            {current}
                        </label>
                       ))} 
    
                    </div>
                    <div className="has-text-danger">{error}</div>
                    <button className="button is-link is-medium is-fullwidth mt-4" onClick={nextClickHandler}>Siguiente</button>
                </div>
            </div>
        </div>
    )
}


export default Quiz
