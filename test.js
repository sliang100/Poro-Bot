const Agenda = require('agenda');

const dbURL = 'mongodb://127.0.0.1:27017/AgendaMedium';

const agenda = new Agenda({
    db: {address: dbURL, collection: 'Agenda'},
    processEvery: '20 seconds',
    useUnifiedTopology: true
});
