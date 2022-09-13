import React from "react";
import holderProfilePic from "../images/avatars/image-amyrobson.png";
import { del, edit, minus, plus, reply } from "../images";

const CommentBox = ({ id, content, createdAt, replies, score, user }, replyStatus) => {
  const {image, username} = user
  console.log(replyStatus)
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
          <button className="comment-box__plus">
            <img className="comment-box__plus-icon" src={plus} alt="plus" />
          </button>
          <p className="comment-box__like-quantity">{score}</p>
          <button className="comment-box__minus">
            <img src={minus} alt="minus" className="comment-box__minus-icon" />
          </button>
        </div>
        <div className="comment-box-reply">
          <img
            src={reply}
            alt="reply-icon"
            className="comment-box-reply__icon"
          />
          <p className="comment-box-reply__text">Reply</p>
        </div>
      </div>
      {/* {replies && replies.length > 0 &&
        replies.map((rep) => {
          return <CommentBox key={rep.id} {...rep}/>;
        })} */}
    </>
  );
};

export default CommentBox;
