import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let postare = {
  title: "",
  description: "",
};

//de facut un array cu toate postarile si cand apelez get servesc arrayul

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    rTitle: postare.title,
    rDescription: postare.description,
  });
});

app.post("/submit", (req, res) => {
  postare.title = req.body["title"].trim();
  postare.description = req.body["description"].trim();
  res.render("index.ejs", {
    rTitle: postare.title,
    rDescription: postare.description,
  });
});

app.post("/delete", (req, res) => {
  console.log(req.query);
  postare = {
    title: "",
    description: "",
  };
  res.render("deleted.ejs", {
    rTitle: postare.title,
    rDescription: postare.description,
  });
});

app.post("/put", (req, res) => {
  postare.title = req.body["title"];
  postare.description = req.body["description"];
  res.render("index.ejs", {
    rTitle: postare.title,
    rDescription: postare.description,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
