import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarController, BarElement, ArcElement, Tooltip, Title } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarController, BarElement, ArcElement, Tooltip, Title);

const Metricas = () => {
    const [selectedOption, setSelectedOption] = useState('weighted avg');
    const [data, setData] = useState(null);

    useEffect(() => {
        let urlDatos = "http://127.0.0.1:8000/metrics"

        fetch(urlDatos)
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const barData = {
        labels: data && data.words[selectedOption] ? data.words[selectedOption].map(item => item[0]) : [],
        datasets: [
            {
                label: 'Peso',
                data: data && data.words[selectedOption] ? data.words[selectedOption].map(item => item[1]) : [],
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.6)',
                hoverBorderColor: 'rgba(75,192,192,1)',
            }
        ]
    };
    
    const barOptions = {
        indexAxis: 'y',
        maintainAspectRatio: false, // This allows you to control the size of the chart
    };

    const createPieData = (value) => ({
        datasets: [{
            data: [value, 1 - value],
            backgroundColor: ['rgba(75,192,192,0.4)', 'rgba(33,37,41,0.6)'],
            borderColor: ['rgba(75,192,192,1)', 'rgba(33,37,41,1)'],
            borderWidth: 1,
        }],
    });


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1>Metricas</h1>
            <select value={selectedOption} onChange={handleSelectChange}>
                <option value="weighted avg">General</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <div style={{paddingBottom: "15px"}} />
            {data && (
                <div style={{ display: 'flex', justifyContent: 'space-around', width: '100vw' }}>
                    <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        {selectedOption === 'weighted avg' && (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <h3>Accuracy</h3>
                                <div style={{ height: '20vh'}}>
                                    <Pie data={createPieData(data.report.accuracy)} />
                                </div>
                                
                            </div>
                        )}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h3>Precision</h3>
                            <div style={{ height: '20vh'}}>
                                <Pie data={createPieData(data.report[selectedOption].precision)} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h3>Recall</h3>
                            <div style={{ height: '20vh'}}>
                                <Pie data={createPieData(data.report[selectedOption].recall)} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h3>F1-Score</h3>
                            <div style={{ height: '20vh'}}>
                                <Pie data={createPieData(data.report[selectedOption]['f1-score'])} />
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '100%' }}>
                        {selectedOption !== 'weighted avg' && (
                            <>
                                <h2>Words</h2>
                                <div style={{ height: '40vh', width: '100%' }}>
                                    <Bar data={barData} options={barOptions} />
                                </div>
                            </>
                        )}
                    </div>
                    </div>
                </div>
            )}
            {!data && <Spinner animation="border" role="status"/>}
        </div>
    );
};

export default Metricas;