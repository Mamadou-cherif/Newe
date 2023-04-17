
const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3000;
const mongoDb = 'mongodb://localhost:27017/filemanager';

mongoose.connect(mongoDb, { useNewUrlParser: true })
.then(() => {
    console.log('DB: Connect OK!');
    app.listen(port, () => {
        console.log('Server running on => http://localhost:' + port);
    });
})
.catch(err => console.log(err));

console.log('Starting...');
