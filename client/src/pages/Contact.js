import React from 'react';

function Contact() {
  return (
    <div className='postContainer'>
      <div className='formContainer'>
        <div className="form-group mb-3">
          <h1 style={{ marginBottom: '1rem', color: '#9e0e40', fontSize: '40px', fontWeight: 'bold' }}>Contact</h1>
        </div>

        <div className='centeredForm'>
          <div className="form-group mb-3">
            <h2 style={{ marginBottom: '1rem', color: '#9e0e40', fontSize: '25px' }}>Adresa Adăpostului:</h2>
            <p>Aleea Potaisa nr 2, Bucuresti, Romania</p>
            <div className="map-container">
              <iframe
                title="Hartă Google Maps - Adăpostul AnimalCARE"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.958842912586!2d26.02006897577588!3d44.41349027107623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b2003f21257d67%3A0x33568f109b27fa50!2sAleea%20Potaisa%202%2C%20Bucure%C8%99ti!5e0!3m2!1sro!2sro!4v1689504179627!5m2!1sro!2sro"
                width="500"
                height="350"
                style={{ border: '0' }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>

          <div className="form-group mb-3">
            <h2 style={{ marginBottom: '1rem', color: '#9e0e40', fontSize: '25px' }}>Număr de telefon mobil:</h2>
            <p>+40 734 294 599</p>
          </div>

          <div className="form-group mb-3">
            <h2 style={{ marginBottom: '1rem', color: '#9e0e40', fontSize: '25px' }}>Număr de telefon fix:</h2>
            <p>+40 987 654 321</p>
          </div>

          <div className="form-group mb-3">
            <h2 style={{ marginBottom: '1rem', color: '#9e0e40', fontSize: '25px' }}>Email:</h2>
            <a href="mailto:animalcare@gmail.com">animalcare@gmail.com</a>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Contact

