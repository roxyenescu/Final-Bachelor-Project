import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import searchIcon from '../images/searchIcon.png';
import Form from 'react-bootstrap/Form';

function AllAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [appointmentToDelete, setAppointmentToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const responseAdoptii = await axios.get('http://localhost:3003/appointment/alllist', {
                    headers: {
                        accessToken: localStorage.getItem('accessToken'),
                    },
                });

                const responseDonatii = await axios.get('http://localhost:3003/donation/alllist', {
                    headers: {
                        accessToken: localStorage.getItem('accessToken'),
                    },
                });

                const appointmentsAdoptii = responseAdoptii.data.map(appointment => ({
                    ...appointment,
                    type: 'ADOPȚIE',
                }));

                const appointmentsDonatii = responseDonatii.data.map(appointment => ({
                    ...appointment,
                    type: 'DONAȚIE',
                }));

                const allAppointments = [...appointmentsAdoptii, ...appointmentsDonatii];
                setAppointments(allAppointments);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAppointments();
    }, []);

    let history = useHistory();
    const viewForm = async (id) => {
        history.push(`/viewadoptionform/${id}`);
    };

    const openConfirmationModal = (appointmentId, appointmentType) => {
        setAppointmentToDelete(appointmentId);
        setShowConfirmationModal(true);
    };

    const closeConfirmationModal = () => {
        setShowConfirmationModal(false);
    };

    const handleDeleteAppointment = (appointmentId, appointmentType) => {
        openConfirmationModal(appointmentId, appointmentType);
    };

    const handleConfirmDelete = () => {
        if (appointmentToDelete) {
            axios
                .delete(`http://localhost:3003/appointment/delete/${appointmentToDelete}`)
                .then((response) => {
                    const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentToDelete);
                    setAppointments(updatedAppointments);
                    closeConfirmationModal();
                })
                .catch((error) => {
                    console.log(error);
                    closeConfirmationModal();
                });
        }
    };

    const handleConfirmSuccess = () => {
        if (appointmentToDelete) {
            const appointmentType = appointments.find(appointment => appointment.id === appointmentToDelete)?.type;
            if (appointmentType === 'ADOPȚIE') {
                axios
                    .delete(`http://localhost:3003/appointment/delete_success_appoint/${appointmentToDelete}`)
                    .then((response) => {
                        const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentToDelete);
                        setAppointments(updatedAppointments);
                        closeConfirmationModal();
                    })
                    .catch((error) => {
                        console.log(error);
                        closeConfirmationModal();
                    });
            } else if (appointmentType === 'DONAȚIE') {
                axios
                    .delete(`http://localhost:3003/donation/delete/${appointmentToDelete}`)
                    .then((response) => {
                        const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentToDelete);
                        setAppointments(updatedAppointments);
                        closeConfirmationModal();
                    })
                    .catch((error) => {
                        console.log(error);
                        closeConfirmationModal();
                    });
            }
        }
    };

    const highlightedText = (text, searchTerm) => {
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.split(regex).map((chunk, index) => {
            if (chunk.toLowerCase() === searchTerm.toLowerCase()) {
                return <span key={index} style={{ color: 'red' }}>{chunk}</span>;
            } else {
                return chunk;
            }
        });
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <h2 style={{ marginBottom: '1rem', color: '#9e0e40', fontSize: '40px', fontWeight: 'bold' }}>Toate programările</h2>

            {/* Bara de căutare */}
            <div className="mx-auto col-lg-4 d-flex">
                <img src={searchIcon} alt="Descriere imagine" className="align-self-center" style={{ width: '35px' }} />
                <Form.Control
                    type="text"
                    placeholder="Caută..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-3 ml-2"
                />
            </div>

            {appointments.length > 0 ? (
                <ul className="appointmentsList">
                    {appointments
                        .filter((appointment) => {
                            const fullName = `${appointment.user?.nume} ${appointment.user?.prenume}`.toLowerCase();
                            const email = appointment.email.toLowerCase();
                            const searchData = `${fullName} ${email} ${moment(appointment.data).format('DD-MM-YYYY')}`;
                            return searchData.includes(searchTerm.toLowerCase());
                        })
                        .map((appointment) => (
                            <li key={appointment.id}>
                                <Card
                                    style={{
                                        width: '40rem',
                                        marginBottom: '1rem',
                                        marginRight: '2rem',
                                        borderWidth: '3px',
                                        backgroundColor: '#e6b4ba',
                                        alignItems: 'center',
                                    }}
                                >
                                    <p>Tip programare: {appointment.type}</p>
                                    <p>Nume și prenume utilizator: {appointment.user ? highlightedText(`${appointment.user.nume} ${appointment.user.prenume}`, searchTerm) : '-'}</p>
                                    <p>Email utilizator: {highlightedText(appointment.email, searchTerm)}</p>
                                    <p>Data și ora programării: {highlightedText(moment(appointment.data).utcOffset('+03:00').format('DD-MM-YYYY HH:mm'), searchTerm)}</p>

                                    {appointment.type === 'ADOPȚIE' && (
                                        <div>
                                            <Card
                                                key={appointment.post.id}
                                                style={{
                                                    width: '18rem',
                                                    marginBottom: '1rem',
                                                    marginRight: '2rem',
                                                    borderColor: 'rgba(236, 48, 20, 0.9)',
                                                    borderWidth: '2px',
                                                    backgroundColor: '#f2f2f2',
                                                }}
                                                className="mb-3"
                                            >
                                                <Card.Img
                                                    variant="top"
                                                    src={`http://localhost:3003/uploads/${appointment.post.img}`}
                                                    style={{
                                                        width: '200px',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        textAlign: 'center',
                                                        margin: 'auto',
                                                    }}
                                                    className="mt-2 img-fluid w-50 h-50"
                                                />
                                                <Card.Body className="text-center">
                                                    <Card.Title style={{ marginBottom: '5px', fontWeight: 'bold' }}>Nume: {appointment.post.nume}</Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    )}
                                    <div>
                                        {appointment.type === 'ADOPȚIE' && (
                                            <Button
                                                variant="danger"
                                                style={{ backgroundColor: 'grey' }}
                                                onClick={() => viewForm(appointment.id)}
                                            >
                                                Vezi formular
                                            </Button>
                                        )}

                                        <Button
                                            variant="danger"
                                            style={{ marginLeft: '20px', backgroundColor: '#9e0e40' }}
                                            onClick={() => handleDeleteAppointment(appointment.id, appointment.type)}
                                        >
                                            Șterge din listă
                                        </Button>
                                    </div>
                                </Card>
                            </li>
                        ))}
                </ul>
            ) : (
                <p>Nu există nicio programare înregistrată.</p>
            )}

            <Modal
                isOpen={showConfirmationModal}
                onRequestClose={closeConfirmationModal}
                contentLabel="Confirmare ștergere programare"
                style={{
                    content: {
                        maxWidth: '40%',
                        maxHeight: '40%',
                        margin: '0 auto',
                        padding: '20px',
                        backgroundColor: '#ffffff',
                        border: '2px solid #000000',
                        borderRadius: '4px',
                        textAlign: 'center',
                    },
                }}
            >
                <h2>Adopția s-a realizat cu succes?</h2>
                <p>"NU" - postarea va redeveni disponibilă pentru utilizatori</p>
                <p>"DA" - postarea va fi ștearsă din listă și salvată în sistem ca adopție finalizată</p>
                <Button variant="secondary" style={{ marginRight: '10%' }} onClick={closeConfirmationModal}>
                    Renunță
                </Button>
                {appointmentToDelete && appointments.find(appointment => appointment.id === appointmentToDelete)?.type === 'ADOPȚIE' && (
                    <Button variant="danger" style={{ marginRight: '10%' }} onClick={handleConfirmDelete}>
                        NU
                    </Button>
                )}
                <Button variant="success" onClick={handleConfirmSuccess}>
                    DA
                </Button>
            </Modal>
        </div>
    );
}

export default AllAppointments;
