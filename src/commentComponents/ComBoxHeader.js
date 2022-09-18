import React from "react";
import { workingOutPostTime } from "../postTime/postTime";

const ComBoxHeader = ({header}) => {
  const {image,username,isUserComment,createdAt} = header
  return (
    <div className="comment-box-headers">
      <img
        src={require(`../images/avatars/${image.png}`)}
        alt="profile-pic"
        className="comment-box__profile-img"
      />
      <h1 className="comment-box__name">{username}</h1>
      {isUserComment && (
        <div className="comment-box-user-tag">
          <p>You</p>
        </div>
      )}
      <p className="comment-box__post-date">{workingOutPostTime(createdAt)}</p>
    </div>
  );
};

export default ComBoxHeader;
