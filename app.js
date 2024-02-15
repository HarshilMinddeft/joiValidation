// load app dependencies
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const Routes = require("./routes/routes.js");
// ...

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ...

app.use("/", Routes);

app.post("/test", (req, res, next) => {
  const Joi = require("joi");
  const data = req.body;
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    phone: Joi.string()
      .regex(/^\d{3}-\d{3}-\d{4}$/)
      .required(),
    birthday: Joi.date().max("1-1-2004").iso(),
  });
  Joi.validate(data, schema, (err, value) => {
    const id = Math.ceil(Math.random() * 9999999);

    if (err) {
      res.status(422).json({
        status: "error",
        message: "Invalid request data",
        data: data,
      });
    } else {
      res.json({
        status: "success",
        message: "User created successfully",
        data: Object.assign({ id }, value),
      });
    }
  });
});

app.listen(4000, () => {
  console.log("Listening on port: 4000");
});
