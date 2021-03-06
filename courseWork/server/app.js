const express = require('express');
const app = express();
const apiRoutes = require('./routes/api/api');
const { storage } = require('./config/multerStorage');
const path = require('path');
const Puzzle = require('./models/puzzle');
const PORT = parseInt(process.argv[2]) || process.env.PORT || 12010;

const mongoose = require('mongoose'); 
const dbUrl = require('./config/db_connection');

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to mongoDB'))
    .catch(err => console.log(`Mongo Error: ${err}`))
    .then(() =>  app.listen(PORT, () => console.log(`Server is ready on port ${PORT}`)))
    .catch((err) => console.error(`Starting Error ${err}`));

app.use(storage.single("file"));

app.use(require('morgan')('dev')); 

app.use('/api/v1', apiRoutes);

// deploy

const distDir = path.join(__dirname, '../client/', 'dist', 'course-work');

app.use(express.static(distDir));

app.get('/*', function(req,res) {
    res.sendFile(path.join(distDir, 'index.html'));
});
