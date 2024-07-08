function showLoggedUserName() {
  const nameSpan = document.getElementById("logged-username");
  let user = localStorage.getItem("loggedInUser");
  if (user) {
    user = JSON.parse(user);
    console.log(user);
  }
  nameSpan.innerText = user?.userName;
}

showLoggedUserName();

function logOut() {
  localStorage.clear();
  checkLoggedInUser();
}

const checkLoggedInUser = () => {
  let user = localStorage.getItem("loggedInUser");
  if (user) {
    user = JSON.parse(user);
  } else {
    window.location.href = "/login.html";
  }
};

const fetchDataFromServer = async () => {
  try {
    const res = await fetch("http://localhost:5000/getPosts");
    const data = await res.json();

    console.log("data coming from server: ", data);
    showData(data);
  } catch (err) {
    console.log("error: ", err);
  }
};

function timeDifference(dateTimeString) {
  const now = new Date();
  const past = new Date(dateTimeString);

  let diffInSeconds = Math.floor((now - past) / 1000);

  const days = Math.floor(diffInSeconds / (24 * 3600));
  diffInSeconds -= days * 24 * 3600;

  const hours = Math.floor(diffInSeconds / 3600);
  diffInSeconds -= hours * 3600;

  const minutes = Math.floor(diffInSeconds / 60);
  const seconds = diffInSeconds % 60;

  let result = "";
  if (days > 0) {
    result += `${days} day${days !== 1 ? "s" : ""}`;
  } else if (hours > 0) {
    result += `${hours} hour${hours !== 1 ? "s" : ""}`;
  } else if (minutes > 0) {
    result += `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  } else {
    result += `${seconds} second${seconds !== 1 ? "s" : ""}`;
  }

  return result;
}

const showData = (postData) => {
  const postContainer = document.getElementById("post-container");

  //posts
  postContainer.innerHTML = "";

  postData.forEach(async (post) => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");

    postDiv.innerHTML = `
    <div class="post-header">
            <div class="post-user-image">
              <img src=${post.userImage} alt="user-image" />
            </div>

            <div class="post-username-time">
              <p class="post-username">${post.postedUserName}</p>
              <div class="posted-time">
                <span>${timeDifference(`${post.postedTime}`)}</span>
                <span>ago</span>
              </div>
            </div>

            <div class="edit-delete-holder">
              <div>
              <button onClick="handleEditPost('${post.postId}')">Edit</button>
              <button onClick="handleDeletePost('${
                post.postId
              }')">Delete</button>
              </div>
            </div>
          </div>

          <div class="post-text">
            <p class="post-text-content">
              ${post.postText}
            </p>
          </div>

          ${
            post.postImageUrl
              ? `<div class="post-image">
            <img
              class="post-image-content"
              src=${post.postImageUrl}
              alt="post-image"
            />
          </div>`
              : ``
          }
    `;

    postContainer.appendChild(postDiv);

    //comments
    let postComments = await fetchCommentsOfPost(post.postId);

    postComments.forEach((comment) => {
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment-holder");

      commentDiv.innerHTML = `
        <div class="comment-container">
              <div class="comment-user-image">
                <img
                  src=${comment.commentedUserImage}
                  alt="user-comment-image"
                />
              </div>

              <div class="comment-text-container">
                <h4>${comment.commentedUsername}</h4>
                <p class="comment-text">
                  ${comment.commentText}
                </p>
              </div>
        </div>
        `;

      postDiv.appendChild(commentDiv);
    });

    //comment input
    let postCommentDiv = document.createElement("div");
    postCommentDiv.classList.add("postComment-container");
    postCommentDiv.innerHTML = `
      <div style="width: 40%">
        <input
          class="postComment-input"
          type="text"
          id = "postComment-input-for-${post.postId}"
          placeholder="Post your comment"
        />
      </div>
      <div style="margin-left: 30px">
        <button
          class="postComment-btn"
          id="comment-btn"
          onClick = "handlePostComment(${post.postId})"
        >
          Comment
        </button>
      </div>
  `;
    postDiv.appendChild(postCommentDiv);
  });
};

const fetchCommentsOfPost = async (postId) => {
  let postComments;
  try {
    let res = await fetch(`http://localhost:5000/getcomments/${postId}`);
    postComments = await res.json();
  } catch (err) {
    console.log("error: ", err);
  } finally {
    return postComments;
  }
};

const handlePostComment = async (postId) => {
  const commentText = document.getElementById(
    `postComment-input-for-${postId}`
  ).value;

  //time
  let now = new Date();
  let commentTime = now.toISOString();

  // apatoto static user id
  let user = localStorage.getItem("loggedInUser");
  if (user) {
    user = JSON.parse(user);
  }

  let commentOfUserId = user?.userId;

  let commentObject = {
    commentOfPostId: postId,
    commentOfUserId: commentOfUserId,
    commentTime: commentTime,
    commentText: commentText,
  };

  const res = await fetch("http://localhost:5000/postComment", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(commentObject),
  });

  const data = await res.json();

  //reload the page for new comment
  location.reload();
};

const handleAddNewPost = async () => {
  const postText = document.getElementById("new-post").value;
  const postImageUrl = document.getElementById("new-post-img-url").value;

  let now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

  let postedTime = now.toISOString();

  // apatoto static user id
  let user = localStorage.getItem("loggedInUser");
  if (user) {
    user = JSON.parse(user);
  }
  let postedUserId = user?.userId;

  const newPostObject = {
    postedUserId: postedUserId,
    postedTime: postedTime,
    postText: postText,
    postImageUrl: postImageUrl,
  };

  const res = await fetch("http://localhost:5000/addNewPost", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newPostObject),
  });

  const data = await res.json();
  console.log("new post data from server: ", data);

  //reload the page for new comment
  location.reload();
};

fetchDataFromServer();
