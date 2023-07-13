const mongoose = require("mongoose");

const dashschema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  department:String,
  salary:Number
});

const DashModel = mongoose.model("employees", dashschema);

module.exports={
    DashModel
}
