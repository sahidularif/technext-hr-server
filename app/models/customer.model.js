const sql = require("./db.js");


//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Defining a constructor for handling single records
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const Customer = function(customer) {
  this.first_name = customer.first_name;
  this.last_name = customer.last_name;
  this.email = customer.email;
};


/*
SQL table structure
===========================================
Field	                Type
==========================================
id	                 int(11)      *PRIMARY KEY
level_col	           varchar(255)
cvss	               varchar(255)
title	               varchar(255)
vulnerability	       varchar(255)
solution             varchar(255)
reference_col	       varchar(255)
*/


//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Bulk Creation of records from csv 
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

Customer.bulkCreate = (req_arr,result) =>{
  sql.query("INSERT INTO customers VALUES ?", [req_arr], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    
    console.log("created customer: ", { number_of_records: req_arr.length });
    result(null, {records:req_arr.length, status:'Sucess'});
  });
};



//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Single record entry in table
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    
    console.log("created customer: ", { ...newCustomer });
    result(null, { ...newCustomer });
  });
};



//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Search record by id
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

Customer.findById = (customerId, result) => {
  sql.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_foundsssss" }, null);
  });
};

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Fetch all the the records 
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


Customer.getAll = result => {
  sql.query("SELECT * FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};


//::::::::::::::::::::::::::::::::::::::::::::
// Update record by ID
//:::::::::::::::::::::::::::::::::::::::::::

Customer.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE customers SET level_col = ?, cvss = ?, title = ?, vulnerability = ?, solution = ?, reference_col = ? WHERE id = ?",
    [customer.level_col, customer.cvss, customer.title, customer.vulnerability, customer.solution, customer.reference_col, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Delete a single record by id
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

Customer.remove = (id, result) => {
  sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};


//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Delete all the records from the table
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

Customer.removeAll = result => {
  sql.query("DELETE FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = Customer;
