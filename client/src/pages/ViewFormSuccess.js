import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';


function ViewFormSuccess() {

    const { id } = useParams();

    const [judet, setJudet] = useState("");
    const [tipLocuinta, setLocuinta] = useState("");
    const [intrebare_1, setIntrebare_1] = useState("");
    const [intrebare_2, setIntrebare_2] = useState("");
    const [intrebare_3, setIntrebare_3] = useState('');
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3003/appointment/successview/${id}`);
                const formData = response.data;

                setJudet(formData.judet);
                setLocuinta(formData.tipLocuinta);
                setIntrebare_1(formData.intrebare_1);
                setIntrebare_2(formData.intrebare_2);
                setIntrebare_3(formData.intrebare_3);
                setIntrebare_4(formData.intrebare_4);
                setIntrebare_5(formData.intrebare_5);
                setIntrebare_6(formData.intrebare_6);
                setIntrebare_7(formData.intrebare_7);
                setIntrebare_8(formData.intrebare_8);
                setIntrebare_9(formData.intrebare_9);
                setIntrebare_10(formData.intrebare_10);
                setIntrebare_11(formData.intrebare_11);
                setIntrebare_12(formData.intrebare_12);
                setIntrebare_13(formData.intrebare_13);
                setIntrebare_14(formData.intrebare_14);
                setIntrebare_15(formData.intrebare_15);
                setIntrebare_16(formData.intrebare_16);
                setIntrebare_17(formData.intrebare_17);
                setIntrebare_18(formData.intrebare_18);

            } catch (error) {
                console.log("Error fetching post data:", error);
            }
        };

        fetchData();
    }, [id]);



    return (
        <div className='rightSide'>
            <h1
                style={{
                    color: 'rgba(236, 48, 20, 0.9)',
                    fontSize: '40px',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                    textAlign: 'center'
                }}

            >Formular adopție</h1>
            <Form className=' mx-auto col-10 col-md-8 col-lg-6'
                style={{
                    width: '40%',
                    marginBottom: '1rem',
                    marginRight: '2rem',
                    borderColor: 'rgba(236, 48, 20, 0.9)',
                    borderWidth: '2px'
                }}
                >
                <div className="form-group mb-3">
                    <Form.Label>Județul în care locuiți în prezent</Form.Label>
                    <Form.Control value={judet} onChange={(e) => setJudet(e.target.value)} disabled />
                </div>

                <div className="form-group mb-3">
                    <Form.Label>Tipul locuinței dvs.</Form.Label>
                    <Form.Control value={tipLocuinta} onChange={(e) => setLocuinta(e.target.value)} disabled/>
                </div>

                <div className="form-group mb-3">
                    <Form.Label>Sunteți proprietar sau chiriaș?</Form.Label>
                    <Form.Control value={intrebare_1} onChange={(e) => setIntrebare_1(e.target.value)} disabled/>
                </div>

                <div className="form-group mb-3">
                    <Form.Label>Vecinii/proprietarul dvs. sunt de acord cu deţinerea unui animal de companie?</Form.Label>
                    <Form.Control value={intrebare_2} onChange={(e) => setIntrebare_2(e.target.value)} disabled/>
                </div>

                <div className="form-group mb-3">
                    <Form.Label>Aveţi copii? Dacă da, vă rugăm să specificaţi vârsta lor:</Form.Label>
                    <Form.Control value={intrebare_3} onChange={(e) => setIntrebare_3(e.target.value)} disabled/>
                </div>

                <div className="form-group mb-3">
                    <Form.Label>Persoanele cu care locuiţi sunt de acord cu deţinerea unui animal de companie?</Form.Label>
                    <Form.Control value={intrebare_4} onChange={(e) => setIntrebare_4(e.target.value)} disabled />
                </div>

                <div className="form-group mb-3">
                    <Form.Label>Detineţi în prezent animal/e de companie?</Form.Label>
                    <Form.Control value={intrebare_5} onChange={(e) => setIntrebare_5(e.target.value)} disabled />
                </div>

                <div className="form-group mb-3">
                    <Form.Label>Ați avut în trecut animal/e de companie?</Form.Label>
                    <Form.Control value={intrebare_6} onChange={(e) => setIntrebare_6(e.target.value)} disabled />
                </div>

                <div className="form-group mb-3">
                    <Form.Label>Cine va fi persoana responsabilă pentru îngrijirea animalului de companie?</Form.Label>
                    <Form.Control value={intrebare_7} onChange={(e) => setIntrebare_7(e.target.value)} disabled />
                </div>

                <div className="form-group mb-3">
                    <Form.Label>Unde ar dormi animalul de companie?</Form.Label>
                    <Form.Control value={intrebare_8} onChange={(e) => setIntrebare_8(e.target.value)} disabled />
                </div>

                <div className="form-group mb-3">
                    <Form.Label>Câte ore ar urma să fie lăsat singur animalul de companie într-o zi?</Form.Label>
                    <Form.Control value={intrebare_9} onChange={(e) => setIntrebare_9(e.target.value)} disabled />
                </div>

                <div className="form-group mb-3">
                    <Form.Label>Cât de des călătoriți?</Form.Label>
                    <Form.Control value={intrebare_10} onChange={(e) => setIntrebare_10(e.target.value)} disabled />
                </div>

                <div className="form-group mb-3">
                    <Form.Label>Care sunt persoanele care ar avea grijă de animalul de companie atâta timp cât dvs. aţi fi plecat pentru mai mult timp? Vă rugăm să numiţi persoana/persoanele şi după caz relaţia dvs. cu acestea:</Form.Label>
                    <Form.Control value={intrebare_11} onChange={(e) => setIntrebare_11(e.target.value)} disabled />
                </div>

                <div className="form-group mb-3">
                    <Form.Label>Dacă animalul de companie ar distruge anumite obiecte în casă/curte, cum aţi reacţiona?</Form.Label>
                    <Form.Control value={intrebare_12} onChange={(e) => setIntrebare_12(e.target.value)} disabled />
                </div>

                <div className="form-group mb-3">
                    <Form.Label>Dacă animalul dvs. de companie ar deveni agresiv faţă de alte animale ale dvs. sau faţă de oameni, ce aţi face?</Form.Label>
                    <Form.Control value={intrebare_13} onChange={(e) => setIntrebare_13(e.target.value)} disabled />
                </div>

                <div className="form-group mb-3">
                    <Form.Label>Dacă animalul de companie ar urma să sufere de o boală sau leziune în urma unui accident, aţi fi pregătit să-i oferiţi îngrijirea medicală necesară recuperării acestuia?</Form.Label>
                    <Form.Control value={intrebare_14} onChange={(e) => setIntrebare_14(e.target.value)} disabled />
                </div>

                <div className="form-group mb-3">
                    <Form.Label>Sunteţi dispus să sterilizati animalul dvs. de companie?</Form.Label>
                    <Form.Control value={intrebare_15} onChange={(e) => setIntrebare_15(e.target.value)} disabled />
                </div>

                <div className="form-group mb-3">
                    <Form.Label>Când aţi castra animalul dvs.?</Form.Label>
                    <Form.Control value={intrebare_16} onChange={(e) => setIntrebare_16(e.target.value)} disabled />
                </div>

                <div className="form-group mb-3">
                    <Form.Label>Ştiţi că un animal de companie poate trăi mai mult de 15 ani? Vă consideraţi pregătit să-i fiţi alături în tot acest timp?</Form.Label>
                    <Form.Control value={intrebare_17} onChange={(e) => setIntrebare_17(e.target.value)} disabled />
                </div>

                <div className="form-group mb-3">
                    <Form.Label>Care este motivul pentru care ați decis să adoptați un animal?</Form.Label>
                    <Form.Control value={intrebare_18} onChange={(e) => setIntrebare_18(e.target.value)} disabled />
                </div>


            </Form>
        </div>
    )
}

export default ViewFormSuccess
