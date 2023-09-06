import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function CreatePost() {

    const [fnume, setFNume] = useState("");
    const [fspecie, setFSpecie] = useState("");
    const [frasa, setFRasa] = useState("");
    const [fgen, setFGen] = useState("");
    const [fvarsta, setFVarsta] = useState("");
    const [fdescriere, setFDescriere] = useState("");
    const [fboli, setFBoli] = useState("");

    const [file, setFile] = useState("");

    const [error, setError] = useState("");

    let history = useHistory();


    const setdata = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "fnume":
                setFNume(value);
                break;
            case "fspecie":
                setFSpecie(value);
                break;
            case "frasa":
                setFRasa(value);
                break;
            case "fgen":
                setFGen(value);
                break;
            case "fvarsta":
                setFVarsta(value);
                break;
            case "fdescriere":
                setFDescriere(value);
                break;
            case "fboli":
                setFBoli(value);
                break;
            default:
                break;
        }
    };


    const setimgfile = (e) => {
        setFile(e.target.files[0]);
    }

    const addAnimalData = async (e) => {
        e.preventDefault();

        if (!fnume || !fspecie || !frasa || !fgen || !fvarsta || !fdescriere || !fboli || !file) {
            setError("Toate câmpurile sunt obligatorii !");
            return;
        }

        var formData = new FormData();
        formData.append("photo", file);

        formData.append("fnume", fnume);
        formData.append("fspecie", fspecie);
        formData.append("frasa", frasa);
        formData.append("fgen", fgen);
        formData.append("fvarsta", fvarsta);
        formData.append("fdescriere", fdescriere);
        formData.append("fboli", fboli);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                accessToken: localStorage.getItem("accessToken")
            }
        }

        const res = await axios.post("http://localhost:3003/posts/postare", formData, config);

        if (res.data.status === 201) {
            history.push("/");
        } else {
            console.log("error");
        }
    }


    return (
        <>
            <div className='container mt-3'>
                <h1
                    style={{
                        color: 'rgba(236, 48, 20, 0.9)',
                        fontSize: '40px',
                        fontWeight: 'bold',
                        marginBottom: '20px'
                    }}

                >Creează o postare</h1>

                <Form>
                    <Form.Group className="mb-3" >
                        <Form.Label>Poza animalului:</Form.Label>
                        <Form.Control type="file" name='photo' onChange={setimgfile} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Numele animalului:</Form.Label>
                        <Form.Control type="text" name='fnume' onChange={setdata} />

                        <Form.Label>Specia animalului:</Form.Label>
                        <Form.Control type="text" name='fspecie' onChange={setdata} />

                        <Form.Label>Rasa animalului:</Form.Label>
                        <Form.Control type="text" name='frasa' onChange={setdata} />

                        <Form.Label>Genul animalului:</Form.Label>
                        <Form.Control type="text" name='fgen' onChange={setdata} />

                        <Form.Label>Varsta animalului:</Form.Label>
                        <Form.Control type="text" name='fvarsta' onChange={setdata} />

                        <Form.Label>Descrierea animalului:</Form.Label>
                        <Form.Control as="textarea" rows={3} type="text" name='fdescriere' onChange={setdata} />

                        <Form.Label>Bolile animalului:</Form.Label>
                        <Form.Control as="textarea" rows={3} type="text" name='fboli' onChange={setdata} />

                        {error && (
                            <p className='text-danger fw-bold'>{error}</p>
                        )}
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={addAnimalData}
                        style={{
                            marginBottom: '30px',
                            backgroundColor: 'rgba(236, 48, 20, 0.9)'
                        }}>
                        Postează
                    </Button>
                </Form>

            </div>
        </>
    )
}

export default CreatePost;
