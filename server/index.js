const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path'); 

const bodyparser = require('body-parser');


app.use(express.json());
app.use(cors());

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use('/uploads', express.static('./uploads')); 

const db = require('./models');


// Routes
const postRouter = require('./routes/Posts-route');
app.use('/posts', postRouter);
const usersRouter = require('./routes/Users-route');
app.use('/auth', usersRouter);
const appointmentsRouter = require('./routes/Appointments_route');
app.use('/appointment', appointmentsRouter);
const donationsRouter = require('./routes/Donations_route');
app.use('/donation', donationsRouter);

db.sequelize.sync().then( () => {
    app.listen(3003, () => {
        console.log("Server running on port 3003!");
    });
});

