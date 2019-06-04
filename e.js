const express = require('express')
const app = express()

/*
router et view engine.
*/
app.get('/', function (req, res) {
  res.render('hello.ejs', { title : 'Titre', message: 'Hello there!'});
})

app.post('/', (req, res) => {
	res.send(req.param('send'));
}) 

app.put('/', (req, res) => {
	res.send('hey');
})

app.listen(8080) 