import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 3000;

let postArray = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log(postArray);
  res.render("index.ejs", {
    posts: postArray,
  });
});

app.post("/submit", (req, res) => {
  const newPost = {
    id: uuidv4(),
    title: req.body["title"].trim(),
    description: req.body["description"].trim(),
  };
  postArray.push(newPost);
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const idToDelete = req.query.id;
  postArray = postArray.filter((post) => post.id !== idToDelete);
  res.redirect("/");
});

app.post("/put", (req, res) => {
  const idToUpdate = req.body.id;
  const updatedTitle = req.body.title.trim();
  const updatedDescription = req.body.description.trim();

  postArray = postArray.map((post) =>
    post.id === idToUpdate
      ? { ...post, title: updatedTitle, description: updatedDescription }
      : post
  );
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
