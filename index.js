const express = require('express');
const app = express()
const {persone} = require('./cards')
const {readFileSync,writeFileSync} = require('fs')

var fs = require('fs');
var http = require('http');
const { cards } = require('./cards');
const { Console } = require('console');

const prova = readFileSync('cards.js','utf-8')





/*
var server = http.createServer((req,res) =>{
  res.writeHead(200, {'Content-Type': 'text/html'});
  var myReadStream = fs.createReadStream(__dirname + '/page.html', 'utf8');
  myReadStream.pipe(res);
});
server.listen(4000,'127.0.0.1');
*/

app.get('/cards/overit/search', (req, res) => {
  const{query} = req.query
  let cardsCopy = [...cards]

  
  if(query){
    cardsCopy = cardsCopy.filter((cardCode) =>{
     if(cardCode.kod === (query))
     {
      cardCode.result = true
      return cardCode.kod
     }
    })
    console.log("********************* RICEVUTO CHECK CARD ***************************")
    console.log("")
    console.log("id rilevato:", query)
    console.log("")
  }
  if (cardsCopy.length <1)
  {
    return res.status(200).json({result: false})
  }
  res.status(200).json(cardsCopy)
  })
  
  
  app.get('/cards/vycerpat/search', (req, res) => {
    const{query,cena,popis,hlasitost} = req.query
    let cardsCopy = [...cards]  // creo una copia perchè cards è const e non posso modificarlo runtime
    if(query){   
      cardsCopy = cardsCopy.filter((cardCode) =>{
       if(cardCode.kod === (query))
       {
        console.log("********************* FINANCIAL ADVISE ***************************")
        if(cena)
        {
         console.log("cena: ", parseFloat(cena.replace(',','.')), '€')
         console.log("cardCode.konto: ", parseFloat(cardCode.konto), '€')
         let app=  parseFloat(cardCode.konto) - parseFloat(cena.replace(',','.'))
         cardCode.konto = parseFloat(app)
         console.log("konto: ", parseFloat(cardCode.konto), '€')
         cardCode.konto = cardCode.konto.toString()
        }
        if(popis)
          console.log("vino scelto: ", popis)
        if(hlasitost)
        {
         console.log("Volume erogato: ", hlasitost)
        }
        //console.log("********************* FINANCIAL ADVISE **************************")

        return cardCode
       }   
      })
    }
    //console.log("cards", cards)
    //console.log("cardsCopy", cardsCopy)
    writeFileSync('cards.js','const cards =\n')   //ricreo il vettore di oggetti javascript
    writeFileSync('cards.js', JSON.stringify(cards), {flag: 'a'})
    writeFileSync('cards.js','\nmodule.exports = {cards}', {flag: 'a'})
    if (cardsCopy.length <1)
     return res.status(200).json({result: false})
    res.status(200).json(cardsCopy)
    })


  app.listen(4000)


//   ----> chiamata:  http://localhost:3000/cards/search?query=U
