import React from "react";
import { useDispatch } from "react-redux";
import {toggleIsReplyActive, currActiveComment, currActiveReply} from "../features/general/generalSlice";
import {Reply} from "../images/svgs/index";

const ComBoxReply = ({replyDetails}) => {
  const dispatch = useDispatch()
  const { isReplyComment , id, replyingTo,username, parentUser} = replyDetails;
  return (
    <div
      className="comment-box-reply"
      onClick={() => {
        dispatch(toggleIsReplyActive());
        if (!isReplyComment) {
          dispatch(currActiveComment(id));
        }
        if (isReplyComment) {
          // was hee
          dispatch(currActiveReply({ id, replyingTo, username, parentUser }));
        }
      }}
    >
      <Reply className="comment-box-reply__icon" />
      <p className="comment-box-reply__text">Reply</p>
    </div>
  );
};

export default ComBoxReply;
