const sql = require("./db.js");


//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Defining a constructor for handling single records
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const Customer = function(customer) {
  this.first_name = customer.first_name;
  this.last_name = customer.last_name;
  this.email = customer.email;
};


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



module.exports = Customer;