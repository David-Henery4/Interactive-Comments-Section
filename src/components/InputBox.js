import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewComment,
  toggleIsReplyActive,
  addReply,
  currActiveComment,
} from "../features/general/generalSlice";
import user from "../images/avatars/image-juliusomo.png";

const InputBox = ({ image, username, name, id }) => {
  const { comments, isReplyActive } = useSelector((store) => store.general);
  const dispatch = useDispatch();
  const [commentValue, setCommentValue] = useState("");
  //
  const handleInputedComment = (com) => {
    const replies = [];
    comments.forEach((c) => replies.push(c.replies));
    const combinedComsAndReps = replies
      .flat()
      .concat(comments)
      .sort((a, b) => a.id - b.id);
    if (!isReplyActive) {
      const commentInfo = {
        id: combinedComsAndReps.length + 1,
        content: com,
        createdAt: "today", // placeholder
        score: 0,
        user: {
          image,
          username,
        },
        isUserComment: true,
        replies: [],
      };
      dispatch(addNewComment(commentInfo));
    }
  };
  //
  const handleReply = (com) => {
    const replies = [];
    comments.forEach((c) => replies.push(c.replies));
    const combinedComsAndReps = replies
      .flat()
      .concat(comments)
      .sort((a, b) => a.id - b.id);
    if (isReplyActive) {
      const currentCommentInfo = comments.find((c) => c.id === id);
      const replyInfo = {
        id: combinedComsAndReps.length + 1,
        content: com,
        createdAt: "today", // placeholder
        score: 0,
        replyingTo: currentCommentInfo.user.username,
        user: {
          image,
          username,
        },
        isUserComment: true,
        isAReply: true,
      };
      dispatch(addReply({ replyInfo, id }));
    }
  };
  //
  const handleReplyToUsername = () => {
    if (isReplyActive) {
      const currentCommentInfo = comments.find((c) => c.id === id);
      // console.log(currentCommentInfo)
      if (currentCommentInfo) {
        setCommentValue(`@${currentCommentInfo.user.username} `);
      }
    }
  };
  //
  useEffect(() => {
    handleReplyToUsername();
  }, [isReplyActive]);
  //
  return (
    <section className="input-box">
      <div className="input-box-text-wrap">
        <textarea
          name="comment"
          id="comment"
          className="input-box-text-wrap__text"
          value={commentValue}
          placeholder="Add a comment..."
          onChange={(e) => setCommentValue(e.target.value)}
        ></textarea>
      </div>
      <div className="input-box-user-wrap">
        <img
          src={require(`../images/avatars/${image.png}`)}
          alt="user-img"
          className="input-box-user-wrap__img"
        />
      </div>
      <button
        form="comment"
        className="input-box__btn"
        onClick={() => {
          handleInputedComment(commentValue);
          handleReply(commentValue);
          setCommentValue("");
          if (isReplyActive) {
            dispatch(toggleIsReplyActive());
            dispatch(currActiveComment("reset"));
          }
        }}
      >
        {name}
      </button>
    </section>
  );
};

export default InputBox;
