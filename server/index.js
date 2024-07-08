const express = require("express");
const mysql = require("mysql");
const port = 5000;
const posts = require("./posts.json");
const cors = require("cors");
const { type } = require("express/lib/response");
const res = require("express/lib/response");
let returnObject = {};

const app = express();

app.use(cors());
app.use(express.json());

//create connection with MySql server
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "postbook",
});

//connect

db.connect((err) => {
  if (err) {
    console.log("Error Connecting to the database: ", err);
    throw err;
  }
  console.log("MySql server connected...");
});

// app.get("/getPosts", (req, res) => {
//   res.send(posts);
// });

// function myTest(postId) {
//   // console.log(postId);
//   let sqlForComment = `SELECT comments.commentOfPostId, users.userName as commentedUsername, comments.commentOfUserId, comments.commentTime, comments.commentText FROM comments INNER JOIN users ON users.userId = comments.commentOfUserId WHERE comments.commentOfPostId = ${postId}`;

//   let query = db.query(sqlForComment, (err, comments) => {
//     if (err) {
//       console.log("Error Connecting to the database: ", err);
//       throw err;
//     }
//     comments.forEach((element) => console.log("one data"));
//   });
// }

app.get("/getPosts", (req, res) => {
  let sqlForPosts =
    "SELECT posts.postId, users.userName AS postedUserName, users.userImage as userImage, posts.postedTime, posts.postText, posts.postImageUrl FROM posts INNER JOIN users ON posts.postedUserId = users.userId ORDER BY posts.postedTime DESC";
  let query = db.query(sqlForPosts, (err, results) => {
    if (err) {
      console.log("Error Connecting to the database: ", err);
      throw err;
    }

    //sending data to front end
    res.send(results);
  });
});

app.get("/getcomments/:postId", (req, res) => {
  let id = parseInt(req.params.postId);

  console.log("gettting comments for post id no: ", id);

  let sqlForComment = `SELECT comments.commentOfPostId, users.userName as commentedUsername, users.userImage as commentedUserImage, comments.commentOfUserId, comments.commentTime, comments.commentText FROM comments INNER JOIN users ON users.userId = comments.commentOfUserId WHERE comments.commentOfPostId = ${id} ORDER BY comments.commentTime ASC`;

  let query = db.query(sqlForComment, (err, comments) => {
    if (err) {
      console.log("Error Connecting to the database: ", err);
      throw err;
    }

    console.log(comments);
    res.send(comments);
  });
});

//get a user information

app.post("/getUserInfo", (req, res) => {
  console.log(req.body);
  const { userId, password } = req.body;

  const getUserInfoSql = `SELECT userId, userName, userImage FROM users WHERE users.userId = ? AND users.userPassword = ?`;
  let query = db.query(getUserInfoSql, [userId, password], (err, result) => {
    if (err) {
      console.log("Error getting user info from the database: ", err);
      throw err;
    }

    console.log(result);
    res.send(result);
  });
});

//post a new comment

app.post("/postComment", (req, res) => {
  const { commentOfPostId, commentOfUserId, commentTime, commentText } =
    req.body;

  let postCommentSql = `INSERT INTO comments(commentOfPostId, commentOfUserId, commentTime, commentText) VALUES (?, ?, ?, ?)`;

  let query = db.query(
    postCommentSql,
    [commentOfPostId, commentOfUserId, commentTime, commentText],
    (err, result) => {
      if (err) {
        console.log("Error adding comment to the database: ", err);
        throw err;
      }

      console.log(result);
      res.send(result);
    }
  );
});

app.post("/addNewPost", (req, res) => {
  const { postedUserId, postedTime, postText, postImageUrl } = req.body;

  const addNewPostsql = `INSERT INTO posts (postedUserId, postedTime, postText, postImageUrl) VALUES (?,?,?,?)`;

  let query = db.query(
    addNewPostsql,
    [postedUserId, postedTime, postText, postImageUrl],
    (err, result) => {
      if (err) {
        console.log("Error adding post to the database: ", err);
        throw err;
      }

      console.log(result);
      res.send(result);
    }
  );
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
