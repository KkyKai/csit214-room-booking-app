const dotenv = require("dotenv");
const path = require("path");
const express = require("express");
const session = require("express-session");

const app = express();

dotenv.config();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

require("./routes/api/authRoutes")(app);
require("./routes/api/bookingRoutes")(app);
require("./routes/api/roomRoutes")(app);
require("./routes/api/promoCodeRoutes")(app);
require("./routes/api/studentRoutes")(app);
require("./routes/api/staffRoutes")(app);
require("./routes/api/userAdminRoutes")(app);
require("./routes/app")(app);

let PORT = process.env.PORT;

if (PORT == null || PORT == "") {
  PORT = 3001;
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
