const database = require("../database");
const express = require("express");

var router = express.Router();

// part 4
// login is handled by frontegg auth app

// part 5
// Check if name || email exist within customer table.
// if !exist add/create new customer with its name & email.
// else successful login, display shop orders from corresponding customer id/name

router.get("/queryCustomer", (request, response) => {
  const sql = `SELECT 1 FROM customer WHERE email = '${request.query.cEmail}' AND name = '${request.query.cName}'`;
  database.connection.all(sql, (errors, results) => {
    if (errors) {
      response.status(500).send("Some error occurred");
    } else {
      response.status(200).send(results);
    }
  });
});

// POST API to store the record received in the request
router.post("/addCustomer", (request, response) => {
  const sqlst = `insert into customer (email, name) values ("${request.body.cEmail}","${request.body.cName}")`;
  database.connection.all(sqlst, (errors, results) => {
    if (errors) {
      response.status(500).send("Some error occurred");
    } else {
      response.status(200).send("Record saved successfully!");
    }
  });
});

//display all the shop orders of the customer with
//1. customer name
//2. item name
//3. item quantity
//4. shipping date
router.get("/customer/all", (request, response) => {
  const sqlst = `SELECT shop_order.id, customer.name, item.name, 
  shop_order.quantity, 
  shop_order.shipping_date
  FROM customer, shop_order, item
  WHERE '${request.query.cEmail}' = shop_order.custEmail 
  AND '${request.query.cEmail}' = customer.email
  AND item.id = shop_order.itemID
  ORDER BY shop_order.shipping_date
  DESC
    `;
  database.connection.all(sqlst, (errors, results) => {
    if (errors) {
      response.status(500).send("Some error occurred");
    } else {
      response.status(200).send(results);
    }
  });
});

// GET API 3 -> Display the highest cost order made by the customer
router.get("/largestBuy", (request, response) => {
  const sqlst = `SELECT shop_order.custEmail, shop_order.id,
  shop_order.address, shop_order.order_date, shop_order.shipping_date,
  (shop_order.quantity * item.price) AS order_amount
  FROM shop_order, item, customer
  WHERE '${request.query.cEmail}' = shop_order.custEmail
  Group BY 1,2,3,4,5
  ORDER BY order_amount
  DESC LIMIT 1`;
  database.connection.all(sqlst, (errors, results) => {
    if (errors) {
      response.status(500).send("Some error occurred");
    } else {
      response.status(200).send(results);
    }
  });
});

// GET API 4 ->	Display best selling item
router.get("/bestSellingItem", (request, response) => {
  const sqlst = `SELECT item.name, item.price
  FROM item, shop_order
  WHERE shop_order.itemID = item.id
  GROUP BY shop_order.itemID
  ORDER BY SUM(shop_order.quantity) DESC
  LIMIT 1`;
  database.connection.all(sqlst, (errors, results) => {
    if (errors) {
      response.status(500).send("Some error occurred");
    } else {
      response.status(200).send(results);
    }
  });
});

// POST API 5 -> 5)	Buy items / Create new buy order

router.post("/addCustomer", (request, response) => {
  const sqlst = `INSERT INTO shop_order 
  (id,custEmail,itemID,quantity,address,order_date,shipping_date) 
  VALUES(${request.body.cid},
  '${request.body.cEmail}',
  ${request.body.cItemID},
  ${request.body.cQty},
  '${request.body.cAddr}',
  '${request.body.cOdate}',
  '');`;
  database.connection.all(sqlst, (errors, results) => {
    if (errors) {
      response.status(500).send("Some error occurred");
    } else {
      response.status(200).send("Order has been placed!");
    }
  });
});

// Return all items to show on purchase screen
router.get("/getAllShopItems", (request, response) => {
  const sqlst = `SELECT item.id, item.name, item.price FROM item`;
  database.connection.all(sqlst, (errors, results) => {
    if (errors) {
      response.status(500).send("Some error occurred");
    } else {
      response.status(200).send(results);
    }
  });
});

// router.post("/customer/add/id/:cid/name/:name/email/:email", (request, response) => {
//   db.connection.all(
//     `insert into customer values ('${request.params.cid}','${request.params.name}','${request.params.email}')`,
//     (errors, results) => {
//       if (errors) {
//         response.status(500).send("Some error occurred");
//       } else {
//         response.status(200).send("Record saved successfully!");
//       }
//     }
//   );
// });

// POST + PUT = Body, GET + DELETE = Query
module.exports = { router };
