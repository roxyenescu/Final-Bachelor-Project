import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import moment from 'moment';
import Alert from 'react-bootstrap/Alert';
import { useHistory } from 'react-router-dom';
import searchIcon from '../images/searchIcon.png';
import Modal from 'react-bootstrap/Modal';

function Main() {
    const [authState, setAuthState] = useState({
        email: '',
        id: 0,
        status: false,
    });

    useEffect(() => {
        axios
            .get('http://localhost:3003/auth/auth', {
                headers: {
                    accessToken: localStorage.getItem('accessToken'),
                },
            })
            .then((response) => {
                if (response.data.error) {
                    setAuthState({ ...authState, status: false });
                } else {
                    setAuthState({
                        email: response.data.email,
                        id: response.data.id,
                        status: true,
                    });
                }
            });
    }, [authState]);

    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [successAppointments, setSuccessAppointments] = useState([]);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const [showDeleteError, setShowDeleteError] = useState(false);

    const getPostData = async () => {
        try {
            const res = await axios.get('http://localhost:3003/posts/getdata', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.data.status === 201) {
                console.log('data get');
                setData(res.data.data);
            } else {
                console.log('error');
            }
        } catch (error) {
            console.log('error', error);
        }

        try {
            const successRes = await axios.get(
                'http://localhost:3003/appointment/all_success_appoint',
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (successRes.data.status === 201) {
                console.log('success appointments get');
                setSuccessAppointments(
                    successRes.data.data.map((appointment) => appointment.postId)
                );
            } else {
                console.log('error');
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    const deletePost = async (id) => {
        console.log(id);
        try {
            const res = await axios.delete(
                `http://localhost:3003/posts/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        accessToken: localStorage.getItem('accessToken'),
                    },
                }
            );

            if (res.data.status === 201) {
                getPostData();
                setShow(true);
            } else {
                console.log('error');
            }
        } catch (error) {
            console.log('error', error);
            setShowConfirmationModal(false);
            setShowDeleteError(true);
        }
    };

    let history = useHistory();
    const editPost = async (id) => {
        history.push(`/updatepost/${id}`);
    };

    useEffect(() => {
        getPostData();
    }, []);

    // Filtrarea datelor bazată pe termenul de căutare
    const filteredData = data.filter((el) => {
        const searchData = `${el.nume} ${el.specie} ${el.gen} ${el.rasa} 
                        ${el.varsta} ${el.descriere} ${el.boli}`;

        return (
            !successAppointments.includes(el.id) &&
            searchData.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const highlightedText = (text, searchTerm) => {
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.split(regex).map((chunk, index) => {
            if (chunk.toLowerCase() === searchTerm.toLowerCase()) {
                return (
                    <span key={index} style={{ color: 'red' }}>
                        {chunk}
                    </span>
                );
            } else {
                return chunk;
            }
        });
    };

    const closeConfirmationModal = () => {
        setShowConfirmationModal(false);
    };

    const handleConfirmDelete = () => {
        if (postToDelete) {
            deletePost(postToDelete);
            closeConfirmationModal();
        }
    };

    return (
        <>
            {show && (
                <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    Postarea a fost ștearsă
                </Alert>
            )}
            {showDeleteError && (
                <Alert variant="danger" onClose={() => setShowDeleteError(false)} dismissible>
                    Nu se poate șterge postarea deoarece există programări pentru aceasta.
                </Alert>
            )}
            <div className="container mt-2">
                <div className="mx-auto col-lg-4 d-flex">
                    <img
                        src={searchIcon}
                        alt="Descriere imagine"
                        className="align-self-center"
                        style={{ width: '35px' }}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Caută..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mb-3 ml-2"
                    />
                </div>
                <div className="d-flex flex-wrap">
                    {filteredData.length > 0 ? (
                        filteredData.map((el, i) => (
                            <Card
                                key={el.id}
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
                                    src={`http://localhost:3003/uploads/${el.img}`}
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
                                    <Card.Title style={{ marginBottom: '5px', fontWeight: 'bold' }}>
                                        Nume: {highlightedText(el.nume, searchTerm)}
                                    </Card.Title>
                                    <Card.Text style={{ marginBottom: '5px' }}>
                                        Specie: {highlightedText(el.specie, searchTerm)}
                                    </Card.Text>
                                    <Card.Text style={{ marginBottom: '5px' }}>
                                        Rasa: {highlightedText(el.rasa, searchTerm)}
                                    </Card.Text>
                                    <Card.Text style={{ marginBottom: '5px' }}>
                                        Gen: {highlightedText(el.gen, searchTerm)}
                                    </Card.Text>
                                    <Card.Text style={{ marginBottom: '5px' }}>
                                        Varsta: {highlightedText(el.varsta, searchTerm)}
                                    </Card.Text>
                                    <Card.Text style={{ marginBottom: '5px' }}>
                                        Descriere: {highlightedText(el.descriere, searchTerm)}
                                    </Card.Text>
                                    <Card.Text style={{ marginBottom: '5px' }}>
                                        Boli: {highlightedText(el.boli, searchTerm)}
                                    </Card.Text>
                                    <Card.Text style={{ marginBottom: '5px', fontSize: '12px' }}>
                                        Data postării: {moment(el.date).format('DD-MM-YYYY')}
                                    </Card.Text>
                                    {authState.status ? (
                                        authState.email === 'roxana23@yahoo.com' ? (
                                            <>
                                                <Button
                                                    variant="primary"
                                                    className="col-lg-6 text-center"
                                                    style={{
                                                        width: '100px',
                                                        backgroundColor: '#ffd4b2',
                                                        color: 'black',
                                                        marginRight: '20px',
                                                    }}
                                                    onClick={() => editPost(el.id)}
                                                >
                                                    Editează
                                                </Button>

                                                <Button
                                                    variant="danger"
                                                    className="col-lg-6 text-center"
                                                    style={{ width: '100px', marginLeft: '20px' }}
                                                    onClick={() => {
                                                        setPostToDelete(el.id);
                                                        setShowConfirmationModal(true);
                                                    }}
                                                >
                                                    Șterge
                                                </Button>
                                            </>
                                        ) : el.disponibil ? (
                                            <Button
                                                variant="primary"
                                                className="col-lg-6 text-center"
                                                style={{ width: '100%', backgroundColor: '#9e0e40' }}
                                                onClick={() => {
                                                    window.location.href = `/adoptionform/${el.id}`;
                                                }}
                                            >
                                                Programare adopție
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="secondary"
                                                className="col-lg-6 text-center"
                                                style={{ width: '100%', backgroundColor: 'grey' }}
                                                disabled={true}
                                            >
                                                Postare indisponibilă momentan
                                            </Button>
                                        )
                                    ) : (
                                        <Button
                                            variant="warning"
                                            className="col-lg-6 text-center text-wrap"
                                            style={{ width: '100%', backgroundColor: '#ffd4b2' }}
                                            role="alert"
                                            onClick={() => {
                                                window.location.href = '/login';
                                            }}
                                        >
                                            Pentru a adopta trebuie să vă autentificați!
                                        </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <p>Nu există postări care să corespundă căutării.</p>
                    )}
                </div>
            </div>

            <Modal show={showConfirmationModal} onHide={closeConfirmationModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmare ștergere</Modal.Title>
                </Modal.Header>
                <Modal.Body>Ești sigur că vrei să ștergi această postare?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeConfirmationModal}>
                        Nu
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Da
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Main;
