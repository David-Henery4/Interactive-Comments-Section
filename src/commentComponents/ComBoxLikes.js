import React from "react";
import {Minus, Plus,} from "../images/svgs/index";

const ComBoxLikes = ({likes}) => {
  const {voted,handleCommentVotes,score} = likes
  return (
    <div className="comment-box-likes">
      <button
        className="comment-box__plus"
        disabled={voted}
        onClick={(e) => handleCommentVotes("inc", e)}
      >
        <div className="comment-box__plus-icon">
          <Plus />
        </div>
      </button>
      <p className="comment-box__like-quantity">{score}</p>
      <button
        className="comment-box__minus"
        disabled={voted}
        onClick={() => handleCommentVotes("dec")}
      >
        <div className="comment-box__minus-icon">
          <Minus />
        </div>
      </button>
    </div>
  );
};

export default ComBoxLikes;
