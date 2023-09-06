import React from 'react';
import '../styles/DonationForm.css';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';

function ChangePsw() {
  let history = useHistory();

  const initialValues = {
    oldPsw: "",
    newPsw: "",
  };

  const validationSchema = Yup.object().shape({
    oldPsw: Yup.string().required("Trebuie să introduci parola veche!"),
    newPsw: Yup.string()
      .min(8, "Minim 8 caractere")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]+$/,
        "Minim o literă mare, minim o literă mică, minim o cifră, minim un caracter special"
      )
      .required("Trebuie să introduci o parolă nouă!"),
  });

  const handleSubmit = (values) => {
    axios
      .put(
        "http://localhost:3003/auth/changepassword",
        {
          oldPsw: values.oldPsw,
          newPsw: values.newPsw,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          history.push('/profile/myprofile');
        }
      });
  };

  return (
    <div className='postContainer'>
      <div className='formContainer'>
        <h1 style={{ marginBottom: '1rem', color: '#9e0e40', fontSize: '40px', fontWeight: 'bold' }}>Schimbă parola</h1>
        <div className="formWrapper"></div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form className='centeredForm' onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <div className="form-group mb-3">
                  <Form.Label>Parola veche</Form.Label>
                  <Form.Control
                    type="password"
                    name="oldPsw"
                    value={values.oldPsw}
                    onChange={handleChange}
                  />
                  {touched.oldPsw && errors.oldPsw && <span>{errors.oldPsw}</span>}
                </div>

                <div className="form-group mb-3">
                  <Form.Label>Parola nouă</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPsw"
                    value={values.newPsw}
                    onChange={handleChange}
                  />
                  {touched.newPsw && errors.newPsw && <span>{errors.newPsw}</span>}
                </div>
              </div>

              <Button
                type="submit"
                className="btn btn-primary"
                style={{ width: '50%', backgroundColor: '#9e0e40' }}
              >
                Salvează
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ChangePsw;