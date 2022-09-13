import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addNewComment} from "../features/general/generalSlice"
import user from "../images/avatars/image-juliusomo.png";

const InputBox = ({image, username}) => {
  const {comments} = useSelector(store => store.general)
  const dispatch = useDispatch()
  const [commentValue,setCommentValue] = useState("")
  //
  const handleInputedComment = (com) => {
    const commentInfo = {
      id: comments.length + 1,
      content: com,
      createdAt: "today", // placeholder
      score: 0,
      user: {
        image,
        username,
      },
      replies: [],
    };
    dispatch(addNewComment(commentInfo));
  }
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
          setCommentValue("");
        }}
      >
        SEND
      </button>
    </section>
  );
};

export default InputBox;
