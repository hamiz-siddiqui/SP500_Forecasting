import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Line from '../components/Line';
import Further from '../components/Further';

function Compare(){
    document.body.style = 'background:black;';
    const [dummyData, setData] = useState([{}]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/home");
                if (!response.ok) {
                    throw new Error(`HTTP error status: ${response.status}`);
                }
                const data = await response.json();
                setData(data);
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    const Dropdown = () => {
        const [smodel, setsmodel] = useState('');
        const [data, setdata] = useState([]);
        const handleOptionChange = (e) => {
            setsmodel(e.target.value);
            if (e.target.value){
                setdata(dummyData[e.target.value]);
            }
        }
        
        return (
            <div className="m-10 bg-black flex flex-col items-center justify-center h-screen" >
                <div className="w-full bg-black text-white p-4 ">
                    <div className="mb-4 justify-right" style={{ width: '25vw' }}>
                        <label htmlFor="options" className="mr-2">Select an option:</label>
                        <select id="options" className="border bg-black border-gray-300 rounded px-3 py-1" onChange={handleOptionChange} value={smodel}>
                            <option value="">Select...</option>
                            <option value="ANN">ANN</option>
                            <option value="ARIMA">ARIMA</option>
                            <option value="SARIMA">SARIMA</option>
                            <option value="SVR">SVR</option>
                            <option value="ETS">ETS</option>
                            <option value="Prophet">Prophet</option>
                            <option value="LSTM">LSTM</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>
                    {data.length > 0 ? <Line data={data} />: <p>Nothing here</p>}


                    {data.length > 0 ? <p className="text-center">Future Predictions</p>: <p></p>}
                    {data.length > 0 ? <Further data={data} />: <p></p>}
                </div>
            </div>
        )
    }

    return (
        <div>
            <br></br>
            <br></br>
            <header className="bg-green-800 text-white py-4 px-6 flex justify-between items-center fixed w-full top-0 z-10">
                <div>
                    <h1 className="text-white font-bold flex">Model Comparison</h1>
                </div>
                <div className="text-white font-bold">
                    <h1>
                        <Link to="/">Evaluate Single Model</Link>
                    </h1>
                </div>
            </header>
            <br></br>
            <div className="flex flex-wrap">
                <div className="w-full md:w-1/2">
                    <Dropdown />
                </div>
                <div className="w-full md:w-1/2">
                    <Dropdown />
                </div>
            </div>
        </div>
        
    )
}

export default Compare;