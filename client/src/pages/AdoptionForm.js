import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import moment from 'moment';
import '../styles/AdoptionForm.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';

function AdoptionForm() {

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


  let { id } = useParams();
  const [postObject, setPostObject] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3003/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });
  }, [id]);


  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const [judet, setJudet] = useState("");
  const [tipLocuinta, setLocuinta] = useState("");
  const [intrebare_1, setIntrebare_1] = useState("");
  const [intrebare_2, setIntrebare_2] = useState("");
  const [intrebare_3, setIntrebare_3] = useState("");
  const [intrebare_4, setIntrebare_4] = useState("");
  const [intrebare_5, setIntrebare_5] = useState("");
  const [intrebare_6, setIntrebare_6] = useState("");
  const [intrebare_7, setIntrebare_7] = useState("");
  const [intrebare_8, setIntrebare_8] = useState("");
  const [intrebare_9, setIntrebare_9] = useState("");
  const [intrebare_10, setIntrebare_10] = useState("");
  const [intrebare_11, setIntrebare_11] = useState("");
  const [intrebare_12, setIntrebare_12] = useState("");
  const [intrebare_13, setIntrebare_13] = useState("");
  const [intrebare_14, setIntrebare_14] = useState("");
  const [intrebare_15, setIntrebare_15] = useState("");
  const [intrebare_16, setIntrebare_16] = useState("");
  const [intrebare_17, setIntrebare_17] = useState("");
  const [intrebare_18, setIntrebare_18] = useState("");

  const [error, setError] = useState("");
  let history = useHistory();

  const setdata = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "judet":
        setJudet(value);
        break;
      case "tipLocuinta":
        setLocuinta(value);
        break;
      case "intrebare_1":
        setIntrebare_1(value);
        break;
      case "intrebare_2":
        setIntrebare_2(value);
        break;
      case "intrebare_3":
        setIntrebare_3(value);
        break;
      case "intrebare_4":
        setIntrebare_4(value);
        break;
      case "intrebare_5":
        setIntrebare_5(value);
        break;
      case "intrebare_6":
        setIntrebare_6(value);
        break;
      case "intrebare_7":
        setIntrebare_7(value);
        break;
      case "intrebare_8":
        setIntrebare_8(value);
        break;
      case "intrebare_9":
        setIntrebare_9(value);
        break;
      case "intrebare_10":
        setIntrebare_10(value);
        break;
      case "intrebare_11":
        setIntrebare_11(value);
        break;
      case "intrebare_12":
        setIntrebare_12(value);
        break;
      case "intrebare_13":
        setIntrebare_13(value);
        break;
      case "intrebare_14":
        setIntrebare_14(value);
        break;
      case "intrebare_15":
        setIntrebare_15(value);
        break;
      case "intrebare_16":
        setIntrebare_16(value);
        break;
      case "intrebare_17":
        setIntrebare_17(value);
        break;
      case "intrebare_18":
        setIntrebare_18(value);
        break;
      default:
        break;
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !selectedDate ||
      !judet ||
      !tipLocuinta ||
      !intrebare_1 ||
      !intrebare_2 ||
      !intrebare_3 ||
      !intrebare_4 ||
      !intrebare_5 ||
      !intrebare_6 ||
      !intrebare_7 ||
      !intrebare_8 ||
      !intrebare_9 ||
      !intrebare_10 ||
      !intrebare_11 ||
      !intrebare_12 ||
      !intrebare_13 ||
      !intrebare_14 ||
      !intrebare_15 ||
      !intrebare_16 ||
      !intrebare_17 ||
      !intrebare_18
    ) {
      setError("Toate câmpurile sunt obligatorii!");
      return;
    } else if (!isAgeChecked) {
      setError("Trebuie să bifați căsuța de confirmare a vârstei!");
      return;
    }

    try {
      const formData = {
        postId: id,
        data: selectedDate,
        judet,
        tipLocuinta,
        intrebare_1,
        intrebare_2,
        intrebare_3,
        intrebare_4,
        intrebare_5,
        intrebare_6,
        intrebare_7,
        intrebare_8,
        intrebare_9,
        intrebare_10,
        intrebare_11,
        intrebare_12,
        intrebare_13,
        intrebare_14,
        intrebare_15,
        intrebare_16,
        intrebare_17,
        intrebare_18,
      };

      const response = await axios.post(
        "http://localhost:3003/appointment/add",
        formData, {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      }
      );

      if (response.status === 201) {
        history.push("/profile/appoiments");
      } else {
        console.log(error.message);
      }
    } catch (error) {
      console.log(error);
    }

    
  };



  return (
    <div className='postPage'>
      <div className='leftSide'>
        <Card
          key={postObject.id}
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
            variant="top"
            src={`http://localhost:3003/uploads/${postObject.img}`}
            style={{
              width: '200px',
              height: '100%',
              objectFit: 'cover',
              textAlign: 'center',
              margin: 'auto'
            }}
            className="mt-2 img-fluid w-50 h-50"
          />
          <Card.Body className='text-center'>
            <Card.Title style={{ marginBottom: '5px', fontWeight: 'bold' }}>Nume: {postObject.nume}</Card.Title>
            <Card.Text style={{ marginBottom: '5px' }}>Specie: {postObject.specie}</Card.Text>
            <Card.Text style={{ marginBottom: '5px' }}>Rasa: {postObject.rasa}</Card.Text>
            <Card.Text style={{ marginBottom: '5px' }}>Gen: {postObject.gen}</Card.Text>
            <Card.Text style={{ marginBottom: '5px' }}>Varsta: {postObject.varsta}</Card.Text>
            <Card.Text style={{ marginBottom: '5px' }}>Descriere: {postObject.descriere}</Card.Text>
            <Card.Text style={{ marginBottom: '5px' }}>Boli: {postObject.boli}</Card.Text>
            <Card.Text style={{ marginBottom: '5px', fontSize: '12px' }}>Data postării: {moment(postObject.date).format("DD-MM-YYYY")}</Card.Text>


          </Card.Body>
        </Card>
      </div>


      <div className='rightSide' >

        <Form className='adoptionForm' onSubmit={handleSubmit}>
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
            <Form.Label>Județul în care locuiți în prezent</Form.Label>
            <Form.Select className="form-control" name='judet' onChange={setdata}>
              <option selected></option>
              <option>Municipiul București</option>
              <option>Alba</option>
              <option>Arad</option>
              <option>Argeș</option>
              <option>Bacău</option>
              <option>Bihor</option>
              <option>Bistrița-Năsăud</option>
              <option>Botoșani</option>
              <option>Brăila</option>
              <option>Brașov</option>
              <option>Buzău</option>
              <option>Călărași</option>
              <option>Caraș-Severin</option>
              <option>Constanța</option>
              <option>Covasna</option>
              <option>Dâmbovița</option>
              <option>Dolj</option>
              <option>Galați</option>
              <option>Giurgiu</option>
              <option>Gorj</option>
              <option>Harghita</option>
              <option>Hunedoara</option>
              <option>Ialomița</option>
              <option>Iași</option>
              <option>Ilfov</option>
              <option>Maramureș</option>
              <option>Mehedinți</option>
              <option>Mureș</option>
              <option>Neamț</option>
              <option>Olt</option>
              <option>Prahova</option>
              <option>Sălaj</option>
              <option>Satu Mare</option>
              <option>Sibiu</option>
              <option>Suceava</option>
              <option>Teleorman</option>
              <option>Timiș</option>
              <option>Tulcea</option>
              <option>Vâlcea</option>
              <option>Vaslui</option>
              <option>Vrancea</option>
            </Form.Select>
          </div>

          <div className="form-group mb-3">
            <Form.Label>Tipul locuinței dvs.</Form.Label>
            <Form.Select className="form-control" name='tipLocuinta' onChange={setdata}>
              <option selected></option>
              <option>Apartament</option>
              <option>Casă</option>
            </Form.Select>
          </div>

          <div className="form-group mb-3">
            <Form.Label>Sunteți proprietar sau chiriaș?</Form.Label>
            <Form.Select className="form-control" name='intrebare_1' onChange={setdata}>
              <option selected></option>
              <option>Proprietar</option>
              <option>Chiriaș</option>
            </Form.Select>
          </div>

          <div className="form-group mb-3">
            <Form.Label>Vecinii/proprietarul dvs. sunt de acord cu deţinerea unui animal de companie?</Form.Label>
            <Form.Select className="form-control" name='intrebare_2' onChange={setdata}>
              <option selected></option>
              <option>Da</option>
              <option>Nu</option>
            </Form.Select>
          </div>

          <div className="form-group mb-3">
            <Form.Label>Aveţi copii? Dacă da, vă rugăm să specificaţi vârsta lor:</Form.Label>
            <Form.Control type="text" name='intrebare_3' onChange={setdata} />
          </div>


          <div className="form-group mb-3">
            <Form.Label>Persoanele cu care locuiţi sunt de acord cu deţinerea unui animal de companie?</Form.Label>
            <Form.Select className="form-control" name='intrebare_4' onChange={setdata}>
              <option selected></option>
              <option>Da</option>
              <option>Nu</option>
            </Form.Select>
          </div>

          <div className="form-group mb-3">
            <Form.Label>Detineţi în prezent animal/e de companie?</Form.Label>
            <Form.Select className="form-control" name='intrebare_5' onChange={setdata}>
              <option selected></option>
              <option>Da</option>
              <option>Nu</option>
            </Form.Select>
          </div>

          <div className="form-group mb-3">
            <Form.Label>Ați avut în trecut animal/e de companie?</Form.Label>
            <Form.Select className="form-control" name='intrebare_6' onChange={setdata}>
              <option selected></option>
              <option>Da</option>
              <option>Nu</option>
            </Form.Select>
          </div>

          <div className="form-group mb-3">
            <Form.Label>Cine va fi persoana responsabilă pentru îngrijirea animalului de companie?</Form.Label>
            <Form.Control type="text" name='intrebare_7' onChange={setdata} />
          </div>

          <div className="form-group mb-3">
            <Form.Label>Unde ar dormi animalul de companie?</Form.Label>
            <Form.Control type="text" name='intrebare_8' onChange={setdata} />
          </div>

          <div className="form-group mb-3">
            <Form.Label>Câte ore ar urma să fie lăsat singur animalul de companie într-o zi?</Form.Label>
            <Form.Control type="text" name='intrebare_9' onChange={setdata} />
          </div>

          <div className="form-group mb-3">
            <Form.Label>Cât de des călătoriți?</Form.Label>
            <Form.Control type="text" name='intrebare_10' onChange={setdata} />
          </div>

          <div className="form-group mb-3">
            <Form.Label>Care sunt persoanele care ar avea grijă de animalul de companie atâta timp cât dvs. aţi fi plecat pentru mai mult timp? Vă rugăm să numiţi persoana/persoanele şi după caz relaţia dvs. cu acestea:</Form.Label>
            <Form.Control type="text" name='intrebare_11' onChange={setdata} />
          </div>

          <div className="form-group mb-3">
            <Form.Label>Dacă animalul de companie ar distruge anumite obiecte în casă/curte, cum aţi reacţiona?</Form.Label>
            <Form.Control type="text" name='intrebare_12' onChange={setdata} />
          </div>

          <div className="form-group mb-3">
            <Form.Label>Dacă animalul dvs. de companie ar deveni agresiv faţă de alte animale ale dvs. sau faţă de oameni, ce aţi face?</Form.Label>
            <Form.Control type="text" name='intrebare_13' onChange={setdata} />
          </div>

          <div className="form-group mb-3">
            <Form.Label>Dacă animalul de companie ar urma să sufere de o boală sau leziune în urma unui accident, aţi fi pregătit să-i oferiţi îngrijirea medicală necesară recuperării acestuia?</Form.Label>
            <Form.Select className="form-control" name='intrebare_14' onChange={setdata}>
              <option selected></option>
              <option>Da</option>
              <option>Nu</option>
            </Form.Select>
          </div>

          <div className="form-group mb-3">
            <Form.Label>Sunteţi dispus să sterilizati animalul dvs. de companie?</Form.Label>
            <Form.Select className="form-control" name='intrebare_15' onChange={setdata}>
              <option selected></option>
              <option>Da</option>
              <option>Nu</option>
            </Form.Select>
          </div>

          <div className="form-group mb-3">
            <Form.Label>Când aţi castra animalul dvs.?</Form.Label>
            <Form.Control type="text" name='intrebare_16' onChange={setdata} />
          </div>

          <div className="form-group mb-3">
            <Form.Label>Ştiţi că un animal de companie poate trăi mai mult de 15 ani? Vă consideraţi pregătit să-i fiţi alături în tot acest timp?</Form.Label>
            <Form.Select className="form-control" name='intrebare_17' onChange={setdata}>
              <option selected></option>
              <option>Da</option>
              <option>Nu</option>
            </Form.Select>
          </div>

          <div className="form-group mb-3">
            <Form.Label>Care este motivul pentru care ați decis să adoptați un animal?</Form.Label>
            <Form.Control type="text" name='intrebare_18' onChange={setdata} />
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
            style={{ width: '100%', backgroundColor: '#9e0e40' }}>Programează vizită
          </Button>

        </Form>
      </div>

    </div>
  )
}

export default AdoptionForm;

