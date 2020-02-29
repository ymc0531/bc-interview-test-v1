var express = require('express');
var router = express.Router();
var sql = require("../database/db.js");


/* GET home page. */
router.get('/', async function(req, res) {
  res.render('index', { title: 'Carlist' });
});

router.get('/edit/:id', async function(req, res) {
  let id = req.params.id;
  res.render('edit', { title: 'Carlist - edit' });
});

router.get('/items', async function(req, res) {
  sql.query("SELECT * FROM items ORDER BY product_name ASC", function (error, result) {
    if (error) {
      console.log("error: ", error);
      res.sendStatus(404);
    }
    if (result) {
      res.send(result);
    }
  });
});

router.post('/item', async function(req, res) {
  let {uid} = req.body;
  sql.query(`SELECT * FROM items WHERE id = '${uid}'`, function (error, result) {
    if (error) {
      console.log("error: ", error);
      res.sendStatus(404);
    }
    if (result) {
      res.send(result);
    }
  });
});

router.put('/item', async function(req, res) {
  let {id, barcode, brand, pname} = req.body;
  brand = brand.replace(' ', '');
  pname = pname.replace(' ', '');
  if(brand == '' || pname == '') {
    res.sendStatus(400);
  }else{
    sql.query(`UPDATE items SET barcode = '${barcode}', brand = '${brand}', product_name = '${pname}' WHERE id = '${id}'`, function (error, result) {
      if (error) {
        console.log("error: ", error);
        res.sendStatus(404);
      }
      if (result) {
        res.sendStatus(200);
      }
    });
  }
});



module.exports = router;
