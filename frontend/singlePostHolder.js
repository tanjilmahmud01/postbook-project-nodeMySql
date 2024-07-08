 <section id="posts-section">
        <!-- single post -->
        <div class="post-container">
          <div class="post-header">
            <img
              class="user-image"
              src="./assets/user-placeholder-image.jpg"
              alt="user-image"
            />
            <div class="post-details">
              <h4 class="post-user-name">User Name</h4>
              <p class="posted-time">1 hour ago</p>
            </div>
          </div>

          <div class="post-text-content">
            <p class="post-text">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi
              qui similique cumque. Laboriosam cupiditate excepturi nisi
              adipisci suscipit dolores voluptatem?
            </p>
          </div>

          <div class="post-image-content">
            <img
              class="post-image"
              src="./assets/user-placeholder-image.jpg"
              alt="post-image"
            />
          </div>
        </div>

        <!-- comments section -->
        <article class="comments-section">
          <!-- single comment -->
          <div class="comment-container">
            <div class="comment-user-image">
              <img
                src="./assets/user-placeholder-image.jpg"
                alt="user-comment-image"
              />
            </div>

            <div class="comment-text-container">
              <h4>User Name</h4>
              <p class="comment-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
                assumenda?
              </p>
            </div>
          </div>
          <!-- single comment -->
          <div class="comment-container">
            <div class="comment-user-image">
              <img
                src="./assets/user-placeholder-image.jpg"
                alt="user-comment-image"
              />
            </div>

            <div class="comment-text-container">
              <h4>User Name</h4>
              <p class="comment-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
                assumenda?
              </p>
            </div>
          </div>
        </article>

        <!-- comment input section -->
        <div style="margin-top: 10px">
          <div class="comment-container">
            <div class="comment-user-image">
              <img
                src="./assets/user-placeholder-image.jpg"
                alt="user-comment-image"
              />
            </div>

            <!-- comment user input -->
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

            <!-- comment button -->
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
      </section>