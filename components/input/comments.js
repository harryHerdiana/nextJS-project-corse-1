import { useState, useEffect, useContext } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-content";

function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(false);
  useEffect(() => {
    if (showComments) {
      setIsFetchingData(true);
      fetch("/api/comment/" + eventId)
        .then((response) => response.json())
        .then((data) => setComments(data.comments));
      setIsFetchingData(false);
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }
  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Sending comment...",
      message: "Your comment is currently being stored",
      status: "pending",
    });
    // send data to API
    fetch("/api/comment/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        response.json().then((data) => {
          throw new Error(data.message || "Something went wrong");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Succesfully add new comment",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingData && <CommentList items={comments} />}
      {showComments && isFetchingData && <p>loading...</p>}
    </section>
  );
}
export default Comments;
