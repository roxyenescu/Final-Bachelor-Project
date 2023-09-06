import React, { useContext, useEffect } from 'react';
import '../styles/LoginRegister.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import $ from 'jquery';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function LoginRegister() {
  useEffect(() => {
    // Animation code
    $(document).ready(function () {
      $('.login-info-box').fadeOut();
      $('.login-show').addClass('show-log-panel');

      $('input[type="radio"]').on('change', function () {
        if ($('#log-reg-show').is(':checked')) {
          $('.register-info-box').fadeIn();
          $('.login-info-box').fadeOut();

          $('.white-panel').removeClass('right-log');

          $('.login-show').addClass('show-log-panel');
          $('.register-show').removeClass('show-log-panel');
        }

        if ($('#log-login-show').is(':checked')) {
          $('.register-info-box').fadeOut();
          $('.login-info-box').fadeIn();

          $('.white-panel').addClass('right-log');
          $('.register-show').addClass('show-log-panel');
          $('.login-show').removeClass('show-log-panel');
        }
      });
    });
  }, []);


  const { authState, setAuthState } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (authState.status) {
      history.push("/");
    }
  }, [authState, history]);

  const initialValues = {
    email: "",
    parola: ""
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email invalid")
      .required("Trebuie să introduci email-ul tău!"),
    parola: Yup.string()
      .required("Trebuie să introduci o parolă!")
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3003/auth/login", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const currentTimestamp = Math.floor(Date.now() / 1000);
          const expirationTimestamp = currentTimestamp + (30 * 24 * 60 * 60);
          localStorage.setItem("accessToken", response.data.token);
          localStorage.setItem("expirationTimestamp", expirationTimestamp);

          setAuthState({
            email: response.data.email,
            id: response.data.id,
            status: true
          });
          history.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("A apărut o eroare la autentificare!");
      });
  };

  const validateNumePrenume = (value) => {
    if (!value) {
      return false;
    }

    const words = value.split(/[\s-]+/);

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (word.length > 0 && !word[0].match(/^[A-ZȘȚĂÂÎ]$/)) {
        return false;
      }
    }

    return true;
  };

  const registerInitialValues = {
    nume: "",
    prenume: "",
    email: "",
    parola: "",
    confParola: ""
  };

  const registerValidationSchema = Yup.object().shape({
    nume: Yup.string()
      .test(
        'nume',
        'Fiecare nume scris cu prima literă mare',
        validateNumePrenume
      )
      .matches(
        /^[A-Za-zȘșȚțĂăÎîÂâ][a-zA-ZȘșȚțĂăÎîÂâ\s-]+$/,
        "Fara numere sau alte caractere speciale in afara de spațiu/linie"
      )
      .required("Trebuie să introduci numele tău de familie!"),

    prenume: Yup.string()
      .test(
        'prenume',
        'Fiecare prenume scris cu prima literă mare',
        validateNumePrenume
      )
      .matches(
        /^[A-Za-zȘșȚțĂăÎîÂâ][a-zA-ZȘșȚțĂăÎîÂâ\s-]+$/,
        "Fara numere sau alte caractere speciale in afara de spațiu/linie"
      )
      .required("Trebuie să introduci prenumele tău!"),

    email: Yup.string()
      .email("Email invalid")
      .required("Trebuie să introduci email-ul tău!"),

    parola: Yup.string()
      .min(8, "Minim 8 caractere")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]+$/,
        "Minim o literă mare, minim o literă mică, minim o cifră, minim un caracter special"
      )
      .required("Trebuie să introduci o parolă!"),

    confParola: Yup.string()
      .oneOf([Yup.ref("parola")], "Trebuie să introduci aceeași parolă!")
      .required("Trebuie să introduci aceeași parolă!")
  });

  const onRegisterSubmit = (data) => {
    axios.post("http://localhost:3003/auth", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(data);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
        alert("A apărut o eroare la înregistrare!");
      });
  };

  return (
    <div className="login-reg-panel">
      <div className="login-info-box">
        <h2>Ai deja un cont?</h2>
        <p>Autentifică-te aici!</p>
        <label id="label-register" htmlFor="log-reg-show">Autentificare</label>
        <input type="radio" name="active-log-panel" id="log-reg-show" value="log-reg-show" />
      </div>

      <div className="register-info-box">
        <h2>Nu ai încă un cont?</h2>
        <p>Creează un cont!</p>
        <label id="label-login" htmlFor="log-login-show">Înregistrare</label>
        <input type="radio" name="active-log-panel" value="log-login-show" id="log-login-show" />
      </div>

      <div className="white-panel">
        <div className="login-show">
          <h2>AUTENTIFICARE</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <Field
                type="email"
                name="email"
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                component="span"
              />

              <Field
                type="password"
                name="parola"
                placeholder="Parolă"
              />
              <ErrorMessage
                name="parola"
                component="span"
              />

              <button type="submit" className='btn'>Conectare</button>
            </Form>
          </Formik>
          {/* <button className="button-reset-password" onClick={redirectToForgotPassword}>Ai uitat parola?</button> */}
        </div>

        <div className="register-show">
          <h2>ÎNREGISTRARE</h2>
          <Formik
            initialValues={registerInitialValues}
            onSubmit={onRegisterSubmit}
            validationSchema={registerValidationSchema}
          >
            <Form>
              <Field
                type="text"
                name="nume"
                placeholder="Nume"
              />
              <ErrorMessage
                name="nume"
                component="span"
              />

              <Field
                type="text"
                name="prenume"
                placeholder="Prenume"
              />
              <ErrorMessage
                name="prenume"
                component="span"
              />

              <Field
                type="email"
                name="email"
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                component="span"
              />

              <Field
                type="password"
                name="parola"
                placeholder="Parolă"
              />
              <ErrorMessage
                name="parola"
                component="span"
              />

              <Field
                type="password"
                name="confParola"
                placeholder="Confirmare parolă"
              />
              <ErrorMessage
                name="confParola"
                component="span"
              />

              <button type="submit">Înregistrează-te</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
