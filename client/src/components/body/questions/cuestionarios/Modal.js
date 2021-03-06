import React from 'react'

const Modal = ({ onClose, results, data}) => {
    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Sus respuestas</p>
                    <button className="delete" onClick={onClose}></button>
                </header>
                <section className="modal-card-body content">
                    <ul>
                        {results.map((result, i) => (
                            <li key={i} className="mb-6">
                                <p><strong>{result.question}</strong></p>
                                <p className={result.a === data[i].answer ? 'has-background-sucess has-text-white p-2' : 'has-background-danger has-text-white p-2'}>Su respuesta: {result.a}</p>
                                {result.a !== data[i].answer && <p className="has-background-link has-text-white p-2">Respuesta Correcta: {data[i].answer}</p>}
                            </li>
                        ))}
                    </ul>
                </section>
            </div>


        </div>
    )
}

export default Modal
