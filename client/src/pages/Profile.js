import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Profile.css';
import animal_lover from '../images/animal-lover.png';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


function Profile() {

  const [user, setUser] = useState(null);
  let history = useHistory();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3003/auth/profile', {
          headers: {
            accessToken: localStorage.getItem('accessToken'),
          },
        });
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className='profilContainer'>
      <div className='formContainer'>
        <h1 style={{ marginBottom: '1rem', color: '#9e0e40', fontSize: '40px', fontWeight: 'bold' }}>Profilul meu</h1>

        <div className='imageContainer'>
          <img src={animal_lover} alt="Descriere imagine" />
        </div>

        <p>
          <strong>Nume:</strong> {user.nume}
        </p>

        <p>
          <strong>Prenume:</strong> {user.prenume}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Data înregistrării:</strong> {String(user.createdAt).substring(0, 10)}
        </p>

        <Button type="submit" className="btn btn-primary"
          style={{ width: '50%', backgroundColor: '#9e0e40' }}
          onClick={() => { history.push('/change-password') }}
        >
          Schimbă parola
        </Button>


      </div>
    </div>
  );
}

export default Profile;
