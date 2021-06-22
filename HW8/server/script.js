const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");
var cors = require('cors')
const moment = require('moment');

const app = express();
let goods = [];

function addToHistory(item) {
  fs.readFile("history.json", "utf-8", (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const history = JSON.parse(data);

      history.push(item);

      fs.writeFile("history.json", JSON.stringify(history), (err) => {
        if (err) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  });
}

app.use(bodyParser.json({ extended: true }));
app.use(express.static("."));
app.use(cors())

app.listen(3000, () => {
  console.log("server is running at port 3000!!");
});

app.get('/cartData', (req, res) => {
  fs.readFile('cart.json', 'utf-8', (err, data) => {
    res.send(data)
  })
})

app.get("/catalogData", (req, res) => {
  fs.readFile("catalogData.json", "utf-8", (err, data) => {
    goods = JSON.parse(data);
    res.send(data);
  });
});

app.get("/history", (req, res) => {
  fs.readFile("history.json", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.post("/addToCart", (req, res) => {
  fs.readFile("cart.json", "utf-8", (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      const item = req.body;

      let id = item.id_product;
      if (cart.find(el => el.id_product === id)) {
        cart.find(el => el.id_product === id).quantity++;
      }
      else {
        const activeGood = goods.find(el => el.id_product === id);
        if (!activeGood) return 0;
        const goodItem = { ...activeGood, quantity: 1 };
        cart.push(goodItem);
      };

      addToHistory({
        ack: "Добавлено",
        name: `${item.product_name}`,
        date: `${moment().format()}`
      });

      fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      });
    }
  });
});

app.post("/delFromCart", (req, res) => {
  fs.readFile("cart.json", "utf-8", (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);

      const item = req.body;

      let id = item.id_product;

      const activeGood = cart.find(el => el.id_product === id);
      if (!activeGood) return 0;
      if (activeGood.quantity > 1) {
        cart.find(el => el.id_product === id).quantity--;
      }
      else {
        cart.splice(cart.findIndex(el => el.id_product === id), 1);
      };

      addToHistory({
        ack: "Удалено",
        name: `${item.product_name}`,
        date: `${moment().format()}`
      });

      fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      });
    }
  });
});


