const express = require('express');
const router = express.Router();
const { Donations, Users } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

const stripe = require('stripe')('sk_test_51NTu71CmVmgTMWKV7fJm03DRbmFqot7U4rozf5nianrfDZj3ct71L7EkDin6tE12CfJkC6t6nfWktmPpgJku1y1a00xxoE6d1U');
const uuid = require('uuid').v4;

router.post('/add', validateToken, async (req, res) => {
    const { data, obiect, cantitate } = req.body;
    const { email } = req.user;

    try {

        const donation = await Donations.create({
            data: new Date(data).toISOString(),
            obiect,
            cantitate,
            email,
        });

        res.status(201).json(donation);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'A aparut o eroare' });
    }
});

async function getUserByEmail(email) {
    const user = await Users.findOne({ where: { email } });
    return user ? user.toJSON() : null;
}

router.get('/list', validateToken, async (req, res) => {
    try {
        const { email } = req.user;

        const donation = await Donations.findAll({
            where: { email },
        });

        const emails = donation.map(donation => donation.email);

        const users = await Promise.all(
            emails.map(email => getUserByEmail(email))
        );

        const donationsWithDetails = donation.map((donation, index) => ({
            ...donation.toJSON(),
            user: users[index]
        }));

        res.status(200).json(donationsWithDetails);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'A apărut o eroare în obținerea listei programărilor.' });
    }
});

router.get('/alllist', async (req, res) => {
    try {
        const donations = await Donations.findAll();

        const emails = donations.map(donation => donation.email);

        const users = await Promise.all(
            emails.map(email => getUserByEmail(email))
        );

        const donationsWithDetails = donations.map((donation, index) => ({
            ...donation.toJSON(),
            user: users[index]
        }));

        res.status(200).json(donationsWithDetails);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'A apărut o eroare în obținerea listei programărilor.' });
    }
});


router.delete('/delete/:id', async (req, res) => {
    const donationId = req.params.id;

    try {
        await Donations.destroy({
            where: {
                id: donationId,
            },
        });

        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'A apărut o eroare în ștergerea programării.' });
    }
});

router.post('/checkout', async (req, res) => {
    console.log("Request: ", req.body);

    let error, status;
    try {
        const { donation, token } = req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const key = uuid();

        const charge = await stripe.charges.create({
            amount: donation.price * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchased the ${donation.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip,
                },
            },
        },
            {
                key,
            }
        );

        console.log('Charge: ', { charge });
        status = 'success';

    } catch (error) {
        console.log(error);
        status = 'failure';
    }

    res.json({ error, status });
});

module.exports = router;