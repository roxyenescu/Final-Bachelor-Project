import React, { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function UpdatePost() {
  const [error, setError] = useState('');
  const [existingImage, setExistingImage] = useState('');

  const { id } = useParams();

  const [nume, setNume] = useState('');
  const [specie, setSpecie] = useState('');
  const [rasa, setRasa] = useState('');
  const [gen, setGen] = useState('');
  const [varsta, setVarsta] = useState('');
  const [descriere, setDescriere] = useState('');
  const [boli, setBoli] = useState('');

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/posts/edit/${id}`);
        const postData = response.data;

        setNume(postData.nume);
        setSpecie(postData.specie);
        setRasa(postData.rasa);
        setGen(postData.gen);
        setVarsta(postData.varsta);
        setDescriere(postData.descriere);
        setBoli(postData.boli);

        setExistingImage(postData.img);
      } catch (error) {
        console.log("Error fetching post data:", error);
      }
    };

    fetchData();
  }, [id]);

  const history = useHistory();

  const updateInfo = async (e) => {
    e.preventDefault();

    if (!nume || !specie || !rasa || !gen || !varsta || !descriere || !boli) {
      setError('Toate câmpurile sunt obligatorii!');
      return;
    }

    const formData = new FormData();
    formData.append('photo', fileInputRef.current.files[0]);
    formData.append('nume', nume);
    formData.append('specie', specie);
    formData.append('rasa', rasa);
    formData.append('gen', gen);
    formData.append('varsta', varsta);
    formData.append('descriere', descriere);
    formData.append('boli', boli);

    try {
      const response = await axios.put(`http://localhost:3003/posts/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          accessToken: localStorage.getItem('accessToken'),
        },
      });

      if (response.data.status === 201) {
        history.push('/');
      } else {
        console.log('Error updating post');
      }
    } catch (error) {
      console.log('Error updating post:', error);
    }
  };

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

        >Editează postarea</h1>

        <Form onSubmit={updateInfo}>
          <Form.Group>
            {existingImage && (
              <div>
                <p>Poza existentă:</p>
                <img src={`http://localhost:3003/uploads/${existingImage}`} alt="Existing" style={{ maxWidth: '200px', maxHeight: '200px' }} />
              </div>
            )}
            <Form.Label>Editează poza animalului:</Form.Label>
            <Form.Control type="file" ref={fileInputRef} accept="image/*" />

          </Form.Group>

          <Form.Group controlId="formNume">
            <Form.Label>Numele animalului:</Form.Label>
            <Form.Control type="text" value={nume} onChange={(e) => setNume(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formSpecie">
            <Form.Label>Specia animalului:</Form.Label>
            <Form.Control type="text" value={specie} onChange={(e) => setSpecie(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formRasa">
            <Form.Label>Rasa animalului:</Form.Label>
            <Form.Control type="text" value={rasa} onChange={(e) => setRasa(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formGen">
            <Form.Label>Genul animalului:</Form.Label>
            <Form.Control type="text" value={gen} onChange={(e) => setGen(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formVarsta">
            <Form.Label>Vârsta animalului:</Form.Label>
            <Form.Control type="text" value={varsta} onChange={(e) => setVarsta(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formDescriere">
            <Form.Label>Descrierea animalului:</Form.Label>
            <Form.Control as="textarea" rows={3} value={descriere} onChange={(e) => setDescriere(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formBoli">
            <Form.Label>Bolile animalului:</Form.Label>
            <Form.Control as="textarea" rows={3} value={boli} onChange={(e) => setBoli(e.target.value)} />
          </Form.Group>



          {error && <div className="error">{error}</div>}
          <Button variant="primary" type="submit"
            style={{
              marginTop: '20px',
              marginBottom: '30px',
              backgroundColor: 'rgba(236, 48, 20, 0.9)'
            }}>
            Actualizează
          </Button>
        </Form>
      </div>
    </>
  );
}

export default UpdatePost;



