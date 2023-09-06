import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';

function ListDonations() {
    const [appointments, setAppointments] = useState([]);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [appointmentToDelete, setAppointmentToDelete] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:3003/donation/list', {
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

    const openConfirmationModal = (appointmentId) => {
        setAppointmentToDelete(appointmentId);
        setShowConfirmationModal(true);
    };

    const closeConfirmationModal = () => {
        setShowConfirmationModal(false);
    };

    const handleDeleteAppointment = (appointmentId) => {
        openConfirmationModal(appointmentId);
    };

    const handleConfirmDelete = () => {
        if (appointmentToDelete) {
            axios
                .delete(`http://localhost:3003/donation/delete/${appointmentToDelete}`)
                .then((response) => {
                    const updatedAppointments = appointments.filter(
                        (appointment) => appointment.id !== appointmentToDelete
                    );
                    setAppointments(updatedAppointments);
                    closeConfirmationModal();
                })
                .catch((error) => {
                    console.log(error);
                    closeConfirmationModal();
                });
        }
    };


    return (
        <div className="d-flex flex-column align-items-center">
            <h2 style={{ marginBottom: '1rem', color: 'rgba(236, 48, 20, 0.9)', fontSize: '40px', fontWeight: 'bold' }}>Programări donații</h2>

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
                                    backgroundColor: '#ffd4b2',
                                    alignItems: 'center'
                                }}
                            >
                                <p>Nume și prenume utilizator: {appointment.user ? `${appointment.user.nume} ${appointment.user.prenume}` : '-'}</p>
                                <p>Data și ora programării: {moment(appointment.data).utcOffset('+03:00').format('DD-MM-YYYY HH:mm')}</p>
                                <p>Obiectul donației: {appointment.obiect} </p>
                                <p>Cantitatea donată: {appointment.cantitate} </p>
                                <Button
                                    variant='danger'
                                    onClick={() => handleDeleteAppointment(appointment.id)}
                                >
                                    Anulare programare
                                </Button>
                            </Card>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nu aveți nicio programare înregistrată.</p>
            )}

            {/* Modul de confirmare */}
            <Modal
                isOpen={showConfirmationModal}
                onRequestClose={closeConfirmationModal}
                contentLabel='Confirmare ștergere programare'
                style={{
                    content: {
                        maxWidth: '40%',
                        maxHeight: '40%',
                        margin: '0 auto',
                        padding: '20px',
                        backgroundColor: '#ffffff',
                        border: '2px solid #000000',
                        borderRadius: '4px',
                        textAlign: 'center'
                    }
                }}
            >

                <h2>Ești sigur că vrei să anulezi programarea?</h2>
                <p>Această acțiune este ireversibilă!</p>
                <Button variant='secondary' onClick={closeConfirmationModal} style={{ marginRight: '10%' }}>Înapoi</Button>
                <Button variant='danger' onClick={handleConfirmDelete}>Anulează</Button>
            </Modal>

        </div>
    )
}

export default ListDonations;
