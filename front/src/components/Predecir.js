import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const Predecir = () => {
    const [inputs, setInputs] = useState([{ text: '', result: null, prob: null }]);

    const [tiempoReal, setTiempoReal] = useState(false);
    const [APIunavailable, setAPIunavailable] = useState(true);

    useEffect(() => {
        const checkAPI = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/');
                if (response.ok) {
                    setAPIunavailable(false);
                } else {
                    setAPIunavailable(true);
                }
            } catch (error) {
                setAPIunavailable(true);
            }
        };
    
        checkAPI();
    }, []);
    

    const handleAddInput = () => {
        setInputs([...inputs, { text: '', result: null, prob: null }]);
    };

    const handleRemoveInput = (index) => {
        if (inputs.length === 1) {
            return;
        }
        setInputs(inputs.filter((_, i) => i !== index));
    };

    const handleInputChange = (index, event) => {
        const newInputs = [...inputs];
        newInputs[index].text = event.target.value;
        setInputs(newInputs);

        if (event.target.value === '') {
            clearInput(index);
            return;
        }

        if (tiempoReal) {
            handlePredictRealTime(index);
        }
    };

    const handlePredictRealTime = async (index) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ review: inputs[index].text })
            });
            if (!response.ok) {
                throw new Error('API no disponible');
            }
            const data = await response.json();
            const newInputs = [...inputs];
            newInputs[index].result = data.result;
            newInputs[index].prob = data.prob;
            setInputs(newInputs);
        } catch (error) {
            alert("API no disponible");
        }
    };
    
    const handlePredict = async () => {
        try {
            for (let index = 0; index < inputs.length; index++) {
                const response = await fetch('http://127.0.0.1:8000/predict', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ review: inputs[index].text })
                });
                if (!response.ok) {
                    throw new Error('API no disponible');
                }
                const data = await response.json();
                const newInputs = [...inputs];
                newInputs[index].result = data.result;
                newInputs[index].prob = data.prob;
                setInputs(newInputs);
            }
        } catch (error) {
            alert("API no disponible");
        }
    };

    const handleClear = () => {
        for (let index = 0; index < inputs.length; index++) {
            clearInput(index);
        }
    }

    const clearInput = (index) => {
        const newInputs = [...inputs];
        newInputs[index].result = null;
        newInputs[index].prob = null;
        newInputs[index].text = '';
        setInputs(newInputs);
    };

    const generateStars = (result) => {
        return '★'.repeat(result) + '☆'.repeat(5 - result);
    };

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ textAlign: 'center', paddingBottom: "15px" }}>Predecir reseñas</h1>
            {APIunavailable ?
            <Spinner animation="border" role="status"/> : 
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <button 
                    onClick={() => setTiempoReal(!tiempoReal)}
                    style={{
                    display: 'inline-block',
                    height: '34px',
                    width: '60px',
                    borderRadius: '34px',
                    backgroundColor: tiempoReal ? 'rgba(75,192,192,1)' : 'Gainsboro',
                    position: 'relative',
                    transition: 'background-color 0.2s',
                    marginBottom: '20px',
                    border: 'none',
                    boxShadow: 'none'
                    }}
                >
                    <div 
                    style={{
                        height: '30px',
                        width: '30px',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        position: 'absolute',
                        top: '2px',
                        left: tiempoReal ? '28px' : '2px',
                        transition: 'left 0.2s'
                    }}
                    />
                </button>
                <p style={{ marginLeft: '10px' }}>Prediccion en tiempo real</p>
            </div>}
            {!APIunavailable &&
            inputs.map((input, index) => (
                <div key={index} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <textarea rows="4" cols="50" value={input.text} onChange={(event) => handleInputChange(index, event)} style={{ marginBottom: '10px', marginRight: '20px', minHeight: '4em'}} />
                    {inputs.length !== 1 ? (
                        <Button variant="outline-primary" onClick={() => handleRemoveInput(index)} style={{ marginRight: '20px' }}>-</Button>
                    ) : (
                        <Button variant="outline-primary" style={{ marginRight: '20px', visibility: 'hidden' }}>-</Button>
                    )}
                    <div style={{ width: '400px', height: '150px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: '100px', textAlign: 'center', marginRight: '20px' }}>
                            {input.result && <p style={{ marginBottom: '10px' }}>{input.result}</p>}
                            {input.result && generateStars(input.result)}
                        </div>
                        {input.prob ? (
                            <Bar
                                data={{
                                    labels: ['1', '2', '3', '4', '5'],
                                    datasets: [
                                        {
                                            data: input.prob,
                                            backgroundColor: 'rgba(75,192,192,0.4)',
                                            borderColor: 'rgba(75,192,192,1)',
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                options={{
                                    indexAxis: 'y',
                                    scales: {
                                        x: {
                                            beginAtZero: true,
                                            max: 1,
                                        },
                                    },
                                }}
                            />
                        ) : <div style={{ width: '300px', height: '150px' }}></div>}
                    </div>
                </div>
            ))}
            {!APIunavailable &&
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <Button variant="primary" onClick={handleAddInput} style={{ marginRight: '10px' }}>+</Button>
                <Button variant="info" onClick={() => handlePredict()} style={{ marginRight: '10px' }}>
                    Predecir
                </Button>
                <Button variant="secondary" onClick={() => handleClear()}>
                    Limpiar
                </Button>
            </div>}
        </div>
    );
};

export default Predecir;