import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/DonationForm.css';
import thankyou from '../images/thank5.jpeg';

function DonationsCash() {

  toast.configure();

  const [donation] = useState({
    name: 'Donație 2 euro',
    price: 2,
    description: 'Donație cu cardul bancar 2 euro'
  });

  async function handleToken(token, addresses) {
    const response = await axios.post('http://localhost:3003/donation/checkout', { token, donation });

    console.log(response.status);

    if (response.status === 200) {
      toast("Donație realizată cu succes!", { type: 'success' });
    } else {
      toast("Donație eșuată!", { type: 'error' });
    }
  };

  return (
    <div className='postContainer'>
      <div className='formContainer'>

        <h1 className='text-center' style={{ marginBottom: '1rem', color: '#9e0e40', fontSize: '40px', fontWeight: 'bold' }}>Donează 2 dolari</h1>

        <div>
          <StripeCheckout
            stripeKey='pk_test_51NTu71CmVmgTMWKVodSwBk1jzkFTHZx4aC1gjWePGb4NYaULX2JF4jiDygqhQUEr4LDndcX8Eb8Rku0LhVWtp6Y900kF7nDVVl'
            token={handleToken}
            amount={donation.price * 100}
            name={donation.name}
            billingAddress
            shippingAddress
          />
        </div>

        <div className='imageContainer'>
            <img src={thankyou} alt="Descriere imagine" />
          </div>
      </div>
    </div>
  )
}

export default DonationsCash;
