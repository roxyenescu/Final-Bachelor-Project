import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

function Charts() {
    const [data, setData] = useState([]);
    const [successAppointments, setSuccessAppointments] = useState([]);
    const [animalData, setAnimalData] = useState([]);

    // Obțin datele pentru grafic din sursa de date
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3003/posts/getdata');
            const jsonData = await response.json();

            if (response.status === 201) {
                setData(jsonData.data);
            } else {
                console.log('Eroare la obținerea datelor');
            }
        } catch (error) {
            console.log('Eroare la obținerea datelor', error);
        }


        try {
            const successResponse = await fetch(
                'http://localhost:3003/appointment/all_success_appoint'
            );
            const successJsonData = await successResponse.json();

            if (successResponse.status === 200) {
                setSuccessAppointments(
                    successJsonData.data.map((appointment) => appointment.postId)
                );
            } else {
                console.log('Eroare la obținerea adopțiilor finalizate cu succes');
            }
        } catch (error) {
            console.log('Eroare la obținerea adopțiilor finalizate cu succes', error);
        }
    };

    const generateSpeciesDataBar = () => {
        const filteredData = data.filter((post) => {
            return !successAppointments.includes(post.id);
        });

        const speciesCount = {
            Pisici: 0,
            Caini: 0,
        };

        // Calculez numărul de pisici și câini din datele disponibile
        filteredData.forEach((post) => {
            if (post.specie === 'pisica') {
                speciesCount.Pisici++;
            } else if (post.specie === 'caine') {
                speciesCount.Caini++;
            }
        });

        const chartData = {
            labels: ['Pisici', 'Caini'],
            datasets: [
                {
                    label: 'Numar de postari',
                    data: [speciesCount.Pisici, speciesCount.Caini],
                    backgroundColor: ['red', 'brown'],
                },
            ],
        };

        return chartData;
    };

    const generateSpeciesDataPie = () => {
        const speciesCount = {
            Pisici: 0,
            Caini: 0,
        };

        // Calculez numărul de adopții finalizate cu succes pentru fiecare specie
        successAppointments.forEach((postId) => {
            const post = data.find((post) => post.id === postId);
            if (post) {
                if (post.specie === 'pisica') {
                    speciesCount.Pisici++;
                } else if (post.specie === 'caine') {
                    speciesCount.Caini++;
                }
            }
        });

        const chartData = {
            labels: ['Pisici', 'Caini'],
            datasets: [
                {
                    label: 'Numar de adopții finalizate cu succes',
                    data: [speciesCount.Pisici, speciesCount.Caini],
                    backgroundColor: ['red', 'brown'],
                },
            ],
        };

        return chartData;
    };

    const speciesDataBar = generateSpeciesDataBar();
    const speciesDataPie = generateSpeciesDataPie();


    

    useEffect(() => {
        fetchDataLine();
    }, []);

    const fetchDataLine = async () => {
        try {
            const response = await fetch('http://localhost:3003/posts/getdata');
            const jsonData = await response.json();

            if (response.status === 201) {
                setAnimalData(jsonData.data);
            } else {
                console.log('Eroare la obținerea datelor');
            }
        } catch (error) {
            console.log('Eroare la obținerea datelor', error);
        }
    };

    const generateAgeData = () => {
        const ageCountsCaini = {};
        const ageCountsPisici = {};

        animalData.forEach((animal) => {
            const age = animal.varsta;
            const specie = animal.specie;

            if (specie === 'caine') {
                if (ageCountsCaini[age]) {
                    ageCountsCaini[age]++;
                } else {
                    ageCountsCaini[age] = 1;
                }
            } else if (specie === 'pisica') {
                if (ageCountsPisici[age]) {
                    ageCountsPisici[age]++;
                } else {
                    ageCountsPisici[age] = 1;
                }
            }
        });

        const ageLabels = Object.keys(ageCountsCaini); 
        const ageDataCaini = Object.values(ageCountsCaini);
        const ageDataPisici = Object.values(ageCountsPisici);

        const chartDataLine = {
            labels: ageLabels,
            datasets: [
                {
                    label: 'Număr câini',
                    data: ageDataCaini,
                    fill: false,
                    borderColor: 'brown',
                    yAxisID: 'caini',
                },
                {
                    label: 'Număr pisici',
                    data: ageDataPisici,
                    fill: false,
                    borderColor: 'red',
                    yAxisID: 'pisici',
                },
            ],
        };

        return chartDataLine;
    };

    const ageChartData = generateAgeData();

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: [
                {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'caini',
                    ticks: {
                        beginAtZero: true,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Câini',
                    },
                },
                {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    id: 'pisici',
                    ticks: {
                        beginAtZero: true,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Pisici',
                    },
                },
            ],
        },
    };


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '100px' }}>
                    <h1 style={{ color: 'red', fontSize: '30px', fontWeight: 'bold', marginTop: '30px' }}>
                        1. Distribuția pe specii din cadrul adăpostului
                    </h1>
                    <div style={{ width: '700px', height: '300px' }}>
                        <Bar data={speciesDataBar} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>

                <div style={{ marginBottom: '100px' }}>
                    <h1 style={{ color: 'red', fontSize: '30px', fontWeight: 'bold', marginTop: '30px' }}>
                        2. Distribuția pe specii în cadrul adopțiilor finalizate cu succes
                    </h1>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <div style={{ width: '400px', height: '400px' }}>
                            <Pie data={speciesDataPie} options={{ maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: '100px' }}>
                    <h1 style={{ color: 'red', fontSize: '30px', fontWeight: 'bold', marginTop: '30px' }}>
                        3. Distribuția pe vârstă a pisicilor și câinilor din adăpost
                    </h1>
                    <div style={{ width: '700px', height: '300px' }}>
                        <Line data={ageChartData} options={options} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Charts;


