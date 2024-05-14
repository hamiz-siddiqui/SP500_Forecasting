import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Line from '../components/Line.js'
import "../index.css";

function Home(){
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
        const render = () => {
            switch (smodel){
                case 'ANN':
                    return (<div><h3>ANN</h3><p>MSE: 26523.036321750253<br></br>MAE: 133.5112777217742<br></br>R2: 0.9637497088313609<br></br></p></div>);
                case 'ARIMA':
                    return (<div><h3>ARIMA</h3><p>MSE: 31304.74318380421<br></br>MAE: 138.9891970038341<br></br>R2: 0.9572143233675786<br></br></p></div>);
                case 'SARIMA':
                    return (<div><h3>SARIMA</h3><p>MSE: 28772.812794766614<br></br>MAE: 126.27520360939748<br></br>R2: 0.9606748326662848<br></br></p></div>);
                case 'SVR':
                    return (<div><h3>SVR</h3><p>MSE: 111279.16925127388<br></br>MAE: 283.05270348213276<br></br>R2: 0.8479094837624248<br></br></p></div>);
                case 'ETS':
                    return (<div><h3>ETS</h3><p>MSE: 796342.7452688022<br></br>MAE: 708.0671160179871<br></br>R2: -0.08839938368423295<br></br></p></div>);
                case 'Prophet':
                    return (<div><h3>Prophet</h3><p>MSE: 501481.1932221146<br></br>MAE: 533.5816398912167<br></br>R2: 0.314601878556768<br></br></p></div>);
                case 'LSTM':
                    return (<div><h3>LSTM</h3><p>MSE: 1165582.5473811394<br></br>MAE: 871.7718909866484<br></br>R2: -0.6713525863449841<br></br></p></div>);
                case 'Hybrid':
                    return (<div><h3>Hybrid</h3><p>MSE: 10557.433833613191<br></br>MAE: 80.24790511592742<br></br>R2: 0.9855706546633849<br></br></p></div>);
            }
        }
        return (
            <div className="m-10 flex bg-black flex flex-col items-center justify-center h-screen" style={{ height: '65vh' }}>
                <div className="w-3/4 bg-black text-white p-4">
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
                    {render()}
                </div>
            </div>
        )
    }
    return (
        <div>
            <br></br><br></br>
            <header className="bg-green-800 text-white py-4 px-6 flex justify-between items-center fixed w-full top-0 z-10">
                <div>
                    <h1 className="text-white font-bold flex">Model Evaluation</h1>
                </div>
                <div className="text-white font-bold">
                    <h1>
                        <Link to="/Compare">Compare Models</Link>
                    </h1>
                </div>
            </header>
            <Dropdown />
        </div>
    )
}

export default Home;