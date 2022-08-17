const database = require("../database");
const express = require("express");

router = express.Router();

// part 4
// login is handled by frontegg auth app

// part 5
// Check if name || email exist within customer table.
// if !exist add/create new customer with its name & email.
// else successful login, display shop orders from corresponding customer id/name

router.get("/customer/queryCustomer", (request, response) => {
  const sql = `SELECT 1 FROM customer WHERE email = '${request.query.email}' AND name = '${request.query.name}'`;
  database.connection.all(sql, (errors, results) => {
    if (errors) {
      response.status(500).send("Some error occurred");
    } else {
      response.status(200).send(results);
    }
  });
});

router.get("/sortedItems", (request, response) => {
  database.connection.all(
    "SELECT name, price FROM item ORDER BY price DESC;",
    (errors, results) => {
      if (errors) {
        response.status(500).send("Some error occurred");
      } else {
        response.status(200).send(results);
      }
    }
  );
});

// POST API to store the record received in the request
router.post("/customer/add", (request, response) => {
  console.log(request.body.email + " & " + request.body.name);
  database.connection.all(
    `insert into customer (email, name) values ('${request.body.email}','${request.body.name}')`,
    (errors, results) => {
      if (errors) {
        response.status(500).send("Some error occurred");
      } else {
        response.status(200).send("Record saved successfully!");
      }
    }
  );
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
module.exports = {
  router,
};
