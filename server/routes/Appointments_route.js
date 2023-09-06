const express = require('express');
const router = express.Router();
const { Appointments, Users, Posts, SuccessAppointments } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.post('/add', validateToken, async (req, res) => {
    const {
        data,
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
    } = req.body;

    const { email } = req.user;


    try {

        const appointment = await Appointments.create({
            postId: req.body.postId,
            data: new Date(data).toISOString(),
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
            email,
        });

        const { postId } = req.body;

        // Actualizez starea postării asociate programării
        await Posts.update(
            { disponibil: false }, // Actualizez câmpul "disponibil" la false
            { where: { id: postId } }
        );

        res.status(201).json(appointment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'A aparut o eroare' });
    }
});


async function getPostById(postId) {
    const post = await Posts.findByPk(postId);
    return post ? post.toJSON() : null;
}

async function getUserByEmail(email) {
    const user = await Users.findOne({ where: { email } });
    return user ? user.toJSON() : null;
}

router.get('/list', validateToken, async (req, res) => {
    try {
        const { email } = req.user;

        const appointments = await Appointments.findAll({
            where: { email },
        });

        // Obțin toate id-urile postărilor din programări
        const postIds = appointments.map(appointment => appointment.postId);
        const emails = appointments.map(appointment => appointment.email);

        // Obțin informațiile despre postări folosind id-urile
        const posts = await Promise.all(
            postIds.map(postId => getPostById(postId))
        );

        const users = await Promise.all(
            emails.map(email => getUserByEmail(email))
        );

        // Combin informațiile despre programări și postări într-un singur obiect
        const appointmentsWithDetails = appointments.map((appointment, index) => ({
            ...appointment.toJSON(),
            post: posts[index],
            user: users[index]
        }));

        res.status(200).json(appointmentsWithDetails);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'A apărut o eroare în obținerea listei programărilor.' });
    }
});


router.get('/alllist', async (req, res) => {
    try {
        const appointments = await Appointments.findAll();

        // Obțin toate id-urile postărilor și emailurile utilizatorilor din programări
        const postIds = appointments.map(appointment => appointment.postId);
        const emails = appointments.map(appointment => appointment.email);

        // Obțin informațiile despre postări și utilizatori folosind id-urile și emailurile
        const posts = await Promise.all(
            postIds.map(postId => getPostById(postId))
        );
        const users = await Promise.all(
            emails.map(email => getUserByEmail(email))
        );

        // Combin informațiile despre programări, postări și utilizatori într-un singur obiect
        const appointmentsWithDetails = appointments.map((appointment, index) => ({
            ...appointment.toJSON(),
            post: posts[index],
            user: users[index]
        }));

        res.status(200).json(appointmentsWithDetails);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'A apărut o eroare în obținerea listei programărilor.' });
    }
});

router.get('/successlist', async (req, res) => {
    try {
        const appointments = await SuccessAppointments.findAll();

        // Obțin toate id-urile postărilor și emailurile utilizatorilor din programări
        const postIds = appointments.map(appointment => appointment.postId);
        const emails = appointments.map(appointment => appointment.email);

        // Obțin informațiile despre postări și utilizatori folosind id-urile și emailurile
        const posts = await Promise.all(
            postIds.map(postId => getPostById(postId))
        );
        const users = await Promise.all(
            emails.map(email => getUserByEmail(email))
        );

        // Combin informațiile despre programări, postări și utilizatori într-un singur obiect
        const appointmentsWithDetails = appointments.map((appointment, index) => ({
            ...appointment.toJSON(),
            post: posts[index],
            user: users[index]
        }));

        res.status(200).json(appointmentsWithDetails);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'A apărut o eroare în obținerea listei programărilor.' });
    }
});


router.delete('/delete/:id', async (req, res) => {
    const appointmentId = req.params.id;

    try {
        const appointment = await Appointments.findOne({
            where: {
                id: appointmentId,
            },
        });

        const postId = appointment.postId;

        await Posts.update(
            { disponibil: true }, // Actualizez câmpul "disponibil" la true
            { where: { id: postId } }
        );

        await Appointments.destroy({
            where: {
                id: appointmentId,
            },
        });

        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'A apărut o eroare în ștergerea programării.' });
    }
});

router.delete('/delete_success_appoint/:id', async (req, res) => {
    const appointmentId = req.params.id;

    try {
        const appointment = await Appointments.findOne({
            where: {
                id: appointmentId,
            },
        });

        if (!appointment) {
            return res.status(404).json({ error: 'Programarea nu a fost găsită.' });
        }

        // Adaug în tabela SuccessAppointments
        await SuccessAppointments.create(appointment.dataValues);

        // Șterg din tabela Appointments
        await Appointments.destroy({
            where: {
                id: appointmentId,
            },
        });

        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'A apărut o eroare în ștergerea programării.' });
    }
});

router.get('/view/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const appoint = await Appointments.findByPk(id);
        return res.json(appoint);
    } catch (err) {
        return res.json({ Error: err.message });
    }
});

router.get('/successview/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const appoint = await SuccessAppointments.findByPk(id);
        return res.json(appoint);
    } catch (err) {
        return res.json({ Error: err.message });
    }
});

router.get('/all_success_appoint', async (req, res) => {
    try {
      const appointments = await SuccessAppointments.findAll();
      res.status(200).json({ status: 201, data: appointments });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 500, error: 'A apărut o eroare în obținerea programărilor de succes.' });
    }
  });



module.exports = router;
