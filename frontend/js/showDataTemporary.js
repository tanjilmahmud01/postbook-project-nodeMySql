const showData = (postData) => {
  const postSection = document.getElementById("posts-section");

  postSection.innerHTML = "";

  postData?.forEach((post) => {
    console.log("post data: ", post);

    const postContainer = document.createElement("div");
    postContainer.classList.add("post-container");

    postContainer.innerHTML = `
      <div>
            <div class="post-header">
              <img
                class="user-image"
                src=${post.postImageUrl}
                alt="user-image"
              />
              <div class="post-details">
                <h4 class="post-user-name">${post.postedUserId}</h4>
                <p class="posted-time">${showTimeDifferenceInHour(
                  `${post.postedTime}`
                )}</p>
                <span>hours ago</span>
              </div>
            </div>
  
            <div class="post-text-content">
              <p class="post-text">
                ${post.postText}
              </p>
            </div>
  
            <div class="post-image-content">
              <img
                class="post-image"
                src=${post.postImageUrl}
                alt="post-image"
              />
            </div>
          </div>
           <section id="comments-section" class="comments-section">
           
          </section>
          <div style="margin-top: 10px">
            <div class="comment-container">
              <div class="comment-user-image">
                <img
                  src="./assets/user-placeholder-image.jpg"
                  alt="user-comment-image"
                />
              </div>
  
              
              <div style="width: 40%">
                <input
                  style="
                    padding: 10px;
                    outline: none;
                    border: 1px solid rgb(100, 95, 95);
                    width: 100%;
                  "
                  type="text"
                  placeholder="Post your comment"
                />
              </div>
  
             
              <div style="margin-left: 30px">
                <button
                  style="
                    padding: 10px;
                    background-color: rgb(243, 11, 11);
                    border: none;
                    color: white;
                    margin-left: 0px;
                    border-radius: 5px;
                    font-weight: 600;
                  "
                  id="comment-btn"
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
      `;

    postSection.appendChild(postContainer);

    //adding the comment
    const commentSection = document.getElementById("comments-section");
    commentSection.innerHTML = "";

    post.postComments?.forEach((comment) => {
      const newDiv = document.createElement("div");
      newDiv.classList.add("comment-holder");

      newDiv.innerHTML = `
        <div class="comment-container">
              <div class="comment-user-image">
                <img
                  src="./assets/user-placeholder-image.jpg"
                  alt="user-comment-image"
                />
              </div>
  
              <div class="comment-text-container">
                <h4>${comment.commentOfUserId}</h4>
                <p class="comment-text">
                  ${comment.commentText}
                </p>
              </div>
        </div>
        `;

      postSection.appendChild(newDiv);
    });
  });
};
