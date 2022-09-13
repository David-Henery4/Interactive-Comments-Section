import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCommentScore,
  toggleIsReplyActive,
} from "../features/general/generalSlice";
import InputBox from "./InputBox";
import holderProfilePic from "../images/avatars/image-amyrobson.png";
import { del, edit, minus, plus, reply } from "../images";

const CommentBox = ({ id, content, createdAt, replies, score, user }) => {
  const [activeComment, setActiveComment] = useState(false);
  const { currentUser, isReplyActive, comments } = useSelector(
    (store) => store.general
  );
  const dispatch = useDispatch();
  const { image, username } = user;
  //
  const handleCommentVotes = (changeType) => {
    dispatch(changeCommentScore({ id, changeType }));
  };
  const checkForActiveComment = (id) => {
    const currentCommentUser = comments.find(c => c.id === id)
    if(currentCommentUser.id === id){
      setActiveComment(!activeComment);
    }
    if(currentCommentUser.id !== id){
      setActiveComment(false)
    }
  };
  //
  // useEffect(() => {
    
  // }, [])
  //
  return (
    <>
      <div className="comment-box">
        <div className="comment-box-headers">
          <img
            src={require(`../images/avatars/${image.png}`)}
            alt="profile-pic"
            className="comment-box__profile-img"
          />
          <h1 className="comment-box__name">{username}</h1>
          <p className="comment-box__post-date">{createdAt}</p>
        </div>
        <div className="comment-box-comment">
          <p className="comment-box-comment__text">{content}</p>
        </div>
        <div className="comment-box-likes">
          <button
            className="comment-box__plus"
            onClick={() => handleCommentVotes("inc")}
          >
            <img className="comment-box__plus-icon" src={plus} alt="plus" />
          </button>
          <p className="comment-box__like-quantity">{score}</p>
          <button
            className="comment-box__minus"
            onClick={() => handleCommentVotes("dec")}
          >
            <img src={minus} alt="minus" className="comment-box__minus-icon" />
          </button>
        </div>
        <div
          className="comment-box-reply"
          onClick={() => {
            dispatch(toggleIsReplyActive())
            checkForActiveComment(id)
          }}
        >
          <img
            src={reply}
            alt="reply-icon"
            className="comment-box-reply__icon"
          />
          <p className="comment-box-reply__text">Reply</p>
        </div>
      </div>
      {/* MIGHT NOT NEED ISREPLYACTIVE, JUST ON ID */}
      {activeComment && isReplyActive && <InputBox {...currentUser} name={"REPLY"} id={id}/>}
      {/* {replies && replies.length > 0 &&
        replies.map((rep) => {
          return <CommentBox key={rep.id} {...rep}/>;
        })} */}
    </>
  );
};

export default CommentBox;
