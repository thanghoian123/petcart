import { Button, Input } from 'reactstrap';
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import YearPicker from "react-year-picker";
import { useState } from 'react';
import axios from 'axios';

function ChartP(props) {
    const [data, setdata] = useState([2478, 5267, 734, 784, 433]);
    const [time, settime] = useState({ month: 1, year: 2000 });
    const [section, setSection] = useState({from:2000,to:2005});
    const [dataSets, setDataSets] = useState([]);
    const token = JSON.parse(localStorage.getItem('token')).accessToken || null;
    // console.log(token);
    const randomColor = () => {
        const Rcolor = [];
        for (let index = 1; index <= 30; index++) {
            const r1 = Math.trunc(Math.random() * 256);
            const r2 = Math.trunc(Math.random() * 256);
            const r3 = Math.trunc(Math.random() * 256);
            Rcolor.push(`rgb(${r1}, ${r2}, ${r3})`)
        }
        return Rcolor;
    }
    const [label, setlabel] = useState([
        "Africa",
        "Asia",
        "Europe",
        "Latin America",
        "North America"
    ]);

    const [color, setcolor] = useState([]);

    const styleTable = {
        width: '700px',
        margin: '0 auto'
    }

    const onHandleClick = () => {
        if (!time.month && !time.year) return;
        var config = {
            method: 'get',
            url: `http://localhost:8081/api/statistic/getMonth?month=${time.month}&year=${time.year}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        axios(config)
            .then(function (res) {
                setdata(res.data.data);
                setlabel(res.data.label);
            })
            .catch(function (error) {
                console.log(error);
            });
        setcolor(randomColor)
    }

    const onHandleClickLineChart = ()=>{
        if (!section.from && !section.to) return;
        if (section.from > section.to) {
            alert("first year have to less than second year!!!!");
            return;
        }
        var config = {
            method: 'get',
            url: `http://localhost:8081/api/statistic/getYear?yearFirst=${section.from}&yearSecond=${section.to}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        axios(config)
            .then(function (res) {
               setDataSets(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const renderOption = () => {
        const arr = []
        for (let index = 1; index <= 12; index++) {
            arr.push(index);

        }
        return arr;
    }

    const arr = renderOption();
    console.log(time);
    return (
        <div style={styleTable}>
            <Line
                data={{
                    labels: ["January", "February", "March", "April", "	May", "June", "July", "	August", "September", "	October", "December"],
                    datasets:dataSets
                }}
                options={{
                    title: {
                        display: true,
                        text: "World population per region (in millions)"
                    },
                    legend: {
                        display: true,
                        position: "bottom"
                    }
                }}
            />
            <YearPicker onChange={year => setSection({ ...section, from: year })} />
            <YearPicker onChange={year => setSection({ ...section, to: year })} />
            <Button onClick={onHandleClickLineChart}>Click</Button>
            
            <Bar
                data={{
                    labels: label,
                    datasets: [
                        {
                            label: "Population (millions)",
                            backgroundColor: color,
                            data: data
                        }
                    ]
                }}
                options={{
                    legend: { display: false },
                    title: {
                        display: true,
                        text: "Predicted world population (millions) in 2050"
                    }
                }}
            />

            <YearPicker onChange={year => settime({ ...time, year: year })} />
            <Input type="select" name="select" id="exampleSelect" onChange={e => settime({ ...time, month: e.target.value })}>
                {arr.map((item, index) => {
                    return (
                        <option key={index}>{item}</option>
                    )
                })}
            </Input>
            <Button outline color="success" onClick={onHandleClick}>Click</Button>
        </div>
    );
}

export default ChartP;