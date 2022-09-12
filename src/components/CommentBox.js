import React from "react";
import holderProfilePic from "../images/avatars/image-amyrobson.png";
import plus from "../images/icon-plus.svg";
import minus from "../images/icon-minus.svg";
import del from "../images/icon-delete.svg";
import reply from "../images/icon-reply.svg";
import edit from "../images/icon-edit.svg";


const CommentBox = () => {
  return (
    <div className="comment-box">
      <div className="comment-box-headers">
        <img
          src={holderProfilePic}
          alt="profile-pic"
          className="comment-box__profile-img"
        />
        <h1 className="comment-box__name">amyrobson</h1>
        <p className="comment-box__post-date">1 month ago</p>
      </div>
      <div className="comment-box-comment">
        <p className="comment-box-comment__text">
          Impressive! Though it seems the drag feature could be improved. But
          overall it looks incredible. You've nailed the design and the
          responsiveness at various breakpoints works really well.
        </p>
      </div>
      <div className="comment-box-likes">
        <button className="comment-box__plus">
          <img className="comment-box__plus-icon" src={plus} alt="plus" />
        </button>
        <p className="comment-box__like-quantity">12</p>
        <button className="comment-box__minus">
          <img src={minus} alt="minus" className="comment-box__minus-icon" />
        </button>
      </div>
      <div className="comment-box-reply">
        <img src={reply} alt="reply-icon" className="comment-box-reply__icon" />
        <p className="comment-box-reply__text">Reply</p>
      </div>
    </div>
  );
};

export default CommentBox;
