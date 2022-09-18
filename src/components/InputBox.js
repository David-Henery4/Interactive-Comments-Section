import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-toastify";
import {
  addNewComment,
  toggleIsReplyActive,
  addReply,
  currActiveComment,
  addReplyToReply,
} from "../features/general/generalSlice";


const InputBox = ({
  image,
  username,
  name,
  id,
  parentUser,
  isReply,
  replyingTo,
}) => {
  //
  const { comments, isReplyActive } = useSelector((store) => store.general);
  const dispatch = useDispatch();
  const [commentValue, setCommentValue] = useState("");
  //
  const handleInputedComment = (com) => {
    if (!com.trim()) {
      toast.error("Please enter a valid comment! :)")
      return
    }
    if (!isReplyActive) {
      const commentInfo = {
        id: +new Date(),
        content: com,
        createdAt: +new Date(),
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
      let currentCommentInfo;
    if (isReplyActive) {
      if(!parentUser){
        const currentInfo = comments.find((c) => c.id === id);
        currentCommentInfo = currentInfo.user.username
      }
      if  (parentUser){
        currentCommentInfo = replyingTo
      }
      const replyInfo = {
        id: +new Date(),
        content: com,
        createdAt: +new Date(),
        score: 0,
        replyingTo: currentCommentInfo,
        user: {
          image,
          username,
        },
        isUserComment: true,
        isAReply: true,
      };
      if (!parentUser) {
        dispatch(addReply({ replyInfo, id }));
      }
      if (parentUser) {
        dispatch(addReplyToReply({ replyInfo, id, parentUser }));
      }
    }
  };
  //
  return (
    <section className={parentUser ? "input-box reply" : "input-box"}>
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
