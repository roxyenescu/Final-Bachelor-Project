import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

function SuccessAppointments() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:3003/appointment/successlist', {
                headers: {
                    accessToken: localStorage.getItem('accessToken'),
                }
            })
            .then((response) => {
                setAppointments(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    let history = useHistory();
    const viewForm = async (id) => {
        history.push(`/viewformsuccess/${id}`);
    }

    const [sheetData, setSheetData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            // Obțin datele pentru programări din sursa de date (API, baza de date, etc.)
            try {
                const response = await fetch('http://localhost:3003/appointment/successlist');
                const jsonData = await response.json();

                if (response.status === 200) {
                    setSheetData(jsonData);
                } else {
                    console.log('Eroare la obținerea datelor');
                }
            } catch (error) {
                console.log('Eroare la obținerea datelor', error);
            }
        };

        fetchData();
    }, []);

    const handleExport = () => {
        if (sheetData) {
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(sheetData);

            XLSX.utils.book_append_sheet(workbook, worksheet, 'Adoptii');

            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(data, 'Success_adoptions_2023.xlsx');
        }
    };


    return (
        <div className="d-flex flex-column align-items-center">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h2 style={{ marginBottom: '1rem', color: 'rgba(236, 48, 20, 0.9)', fontSize: '40px', fontWeight: 'bold' }}>Adopții finalizate cu success</h2>
                <Button variant="primary" style={{ marginLeft: '2rem', backgroundColor: 'rgba(236, 48, 20, 0.9)' }} onClick={handleExport}>
                    Raport an 2023
                </Button>
            </div>
            {appointments.length > 0 ? (
                <ul className='appointmentsList'>
                    {appointments.map((appointment) => (
                        <li key={appointment.id}>
                            <Card
                                style={{
                                    width: '40rem',
                                    marginBottom: '1rem',
                                    marginRight: '2rem',
                                    borderWidth: '3px',
                                    backgroundColor: '#fca968',
                                    alignItems: 'center'
                                }}
                            >
                                <p>Nume și prenume utilizator: {appointment.user ? `${appointment.user.nume} ${appointment.user.prenume}` : '-'}</p>
                                <p>Email utilizator: {appointment.email}</p>
                                <p>Data și ora programării: {moment(appointment.data).utcOffset('+03:00').format('DD-MM-YYYY HH:mm')}</p>
                                <p>Postarea pentru care s-a făcut programarea:</p>
                                <div>
                                    <Card
                                        key={appointment.post.id}
                                        style={{
                                            width: '18rem',
                                            marginBottom: '1rem',
                                            marginRight: '2rem',
                                            borderColor: 'rgba(236, 48, 20, 0.9)',
                                            borderWidth: '2px',
                                            backgroundColor: '#f2f2f2'
                                        }}
                                        className='mb-3'
                                    >
                                        <Card.Img
                                            variant='top'
                                            src={`http://localhost:3003/uploads/${appointment.post.img}`}
                                            style={{
                                                width: '200px',
                                                height: '100%',
                                                objectFit: 'cover',
                                                textAlign: 'center',
                                                margin: 'auto'
                                            }}
                                            className='mt-2 img-fluid w-50 h-50'
                                        />
                                        <Card.Body className='text-center'>
                                            <Card.Title style={{ marginBottom: '5px', fontWeight: 'bold' }}>Nume: {appointment.post.nume}</Card.Title>
                                            <Card.Text style={{ marginBottom: '5px' }}>Specie: {appointment.post.specie}</Card.Text>
                                            <Card.Text style={{ marginBottom: '5px' }}>Rasa: {appointment.post.rasa}</Card.Text>
                                            <Card.Text style={{ marginBottom: '5px' }}>Gen: {appointment.post.gen}</Card.Text>
                                            <Card.Text style={{ marginBottom: '5px' }}>Varsta: {appointment.post.varsta}</Card.Text>
                                            <Card.Text style={{ marginBottom: '5px' }}>Descriere: {appointment.post.descriere}</Card.Text>
                                            <Card.Text style={{ marginBottom: '5px' }}>Boli: {appointment.post.boli}</Card.Text>
                                            <Card.Text style={{ marginBottom: '5px', fontSize: '12px' }}>Data postării: {moment(appointment.post.date).format('DD-MM-YYYY')}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div>
                                    <Button
                                        variant="danger"
                                        style={{ backgroundColor: 'grey' }}
                                        onClick={() => viewForm(appointment.id)}
                                    >
                                        Vezi formular
                                    </Button>
                                </div>
                            </Card>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nu există nicio programare înregistrată.</p>
            )}

        </div>
    );
}

export default SuccessAppointments;
