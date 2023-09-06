import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import thankyou from '../images/thank1.jpeg';
import '../styles/DonationForm.css';
import axios from 'axios';

function DonationsForm() {

  const [selectedDate, setSelectedDate] = useState(null);
  const [obiect, setObiect] = useState("");
  const [cantitate, setCantitate] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();
  const [isAgeChecked, setIsAgeChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsAgeChecked(event.target.checked);
  };

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 5);
  const minTime = new Date();
  minTime.setHours(9, 0, 0);
  const maxTime = new Date();
  maxTime.setHours(17, 0, 0);


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const setdata = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "obiect":
        setObiect(value);
        break;
      case "cantitate":
        setCantitate(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedDate || !obiect || !cantitate) {
      setError("Toate câmpurile sunt obligatorii!");
      return;
    } else if (!isAgeChecked) {
      setError("Trebuie să bifați căsuța de confirmare a vârstei!");
      return;
    }

    try {
      const formData = {
        data: selectedDate,
        obiect,
        cantitate
      };

      const response = await axios.post(
        "http://localhost:3003/donation/add",
        formData, {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      }
      );

      if (response.status === 201) {
        history.push("/profile/donations");
      } else {
        console.log(error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='postContainer'>

      <div className='formContainer'>
        <h1 style={{ marginBottom: '1rem', color: '#9e0e40', fontSize: '40px', fontWeight: 'bold' }}>Formular programare vizită</h1>
        <Form className='centeredForm' onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <Form.Label>Alegeți data și ora programării</Form.Label>
            <br />
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              minDate={new Date()}
              maxDate={maxDate}
              minTime={minTime}
              maxTime={maxTime}
              dateFormat="Pp"
              showTimeSelect
              timeFormat='p'
              isClearable
              className="form-control"
            />
          </div>

          <div className="form-group mb-3">
            <Form.Label>Obiectul donației</Form.Label>
            <Form.Select
              className="form-control"
              name='obiect'
              onChange={setdata}
            >
              <option selected></option>
              <option>Jucării</option>
              <option>Mâncare</option>
            </Form.Select>
          </div>

          <div className="form-group mb-3">
            <Form.Label>Cantitate</Form.Label>
            <Form.Control type="text" name='cantitate' onChange={setdata} />
          </div>

          {error && (
            <p className='text-danger fw-bold'>{error}</p>
          )}

          <div className="form-group" style={{ marginTop: '30px' }}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="gridCheck"
                checked={isAgeChecked}
                onChange={handleCheckboxChange}
              />
              <Form.Label className="form-check-label" htmlFor="gridCheck">
                Declar că am minim vârsta de 18 ani
              </Form.Label>
            </div>
          </div>

          <Button type="submit" className="btn btn-primary"
            style={{ width: '50%', backgroundColor: '#9e0e40' }}>Programează vizită
          </Button>

          <div className='imageContainer'>
            <img src={thankyou} alt="Descriere imagine" />
          </div>
        </Form>

      </div>
    </div>
  )
}

export default DonationsForm;
