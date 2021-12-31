const { response } = require('express');
const express = require('express');
const app = express();
app.listen(5501, () => console.log('listening at 5501'));
app.use('/',express.static('public'));
app.use(express.json({ limit: '1mb' }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5502');
  next();
});let query = 'SELECT DISTINCT Player name, Position pos, Team team, GF_60 gf, GA_60 ga FROM playerData';
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('jsData.db',sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to DB');
});

app.get('/api', (req, res) => {
    db.all(query,[],(err, rows) => {
        if (err) {
            res.end();
            return;
        }
        res.json(rows);
        //closeDb();
        
    });
});


function closeDb() {
    db.close((err) => {
    if (err) {
        return console.error(err.message);
     }
    console.log('Closed the DB');
    });
}
