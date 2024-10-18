const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const session = require('express-session');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);
// cors 
app.use(cors());

const routes = require('./routes/routes');
const admin = require('./routes/admin');
const community = require('./routes/community');
const help = require('./routes/help');
const resources = require('./routes/resource');
app.use('/api/v1', routes);
app.use('/api/v1/admin', admin);
app.use('/api/v1/community', community);
app.use('/api/v1/help', help);
app.use('/api/v1/resources', resources);

const User = require('./models/user');
const Admin = require('./models/admin');
const HelpRequest = require('./models/HelpRequest');
const Story = require('./models/Story');

sequelize.sync()
.then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
