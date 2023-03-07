const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();
 
// for new version mongoose library
mongoose.set("strictQuery", true);
 
mongoose
  .connect("mongodb:******")
  .then({
    // these are not obligatories
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    // useCreateIndex: true
  })  

  .then(() => console.log("DB is connected!"))
  .catch((error) => console.log(error));

  module.exports = mongoose; 


  