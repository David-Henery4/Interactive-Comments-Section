import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {changeCommentScore,changeReplyScore,} from "../features/general/generalSlice";
import InputBox from "./InputBox";
import {ComBoxHeader, ComBoxLikes, ComBoxDelEdit, ComBoxReply, ComBoxEditBtn, ComBoxComment, RepliesContainer} from "../commentComponents";

const CommentBox = ({
  id,
  content,
  createdAt,
  replies,
  score,
  user,
  getInfoForDelete,
  replyingTo = "",
  parentUser = "",
  isCommentActive = false,
  isUserComment = false,
  isReplyComment = false,
  isAReply = false,
}) => {
  const { currentUser, isReplyActive} = useSelector(
    (store) => store.general
  );
  const dispatch = useDispatch();
  const { image, username } = user;
  const [isEdit, setIsEdit] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [voted,setVoted] = useState(false);
  //
  const handleCommentVotes = (changeType, e) => {
    if (isReplyComment) {
      dispatch(changeReplyScore({ id, changeType, parentUser }));
    }
    if (!isReplyComment) {
      dispatch(changeCommentScore({ id, changeType }));
    }
    setVoted(true)
  };
  //
  const handleDelete = (id) => {
    getInfoForDelete({id,parentUser,isAReply})
  };
  //
  const handleEdit = (id) => {
    setIsEdit(true); // MIGHT be toggle
    setEditContent(content); // could add to useState directly
  };
  //
  return (
    <>
      <div className={isReplyComment ? "comment-box reply" : "comment-box"}>
        <ComBoxHeader header={{ image, username, isUserComment, createdAt }} />
        <ComBoxComment
          ContentDetails={{
            isEdit,
            editContent,
            setEditContent,
            isReplyComment,
            content,
            replyingTo,
          }}
        />
        <ComBoxLikes likes={{ voted, handleCommentVotes, score }} />
        {isUserComment ? (
          <ComBoxDelEdit delEdit={{ handleDelete, handleEdit, id }} />
        ) : (
          <ComBoxReply
            replyDetails={{
              isReplyComment,
              id,
              replyingTo,
              username,
              parentUser,
            }}
          />
        )}
        {isEdit && (
          <ComBoxEditBtn
            editBtn={{
              isAReply,
              id,
              editContent,
              parentUser,
              setEditContent,
              setIsEdit,
            }}
          />
        )}
      </div>
      {isCommentActive && isReplyActive && (
        <InputBox
          {...currentUser}
          name={"REPLY"}
          id={id}
          parentUser={parentUser}
          replyingTo={user.username}
        />
      )}
      {replies && replies.length > 0 && (
        <RepliesContainer
          repliesWrap={{ currentUser, user, getInfoForDelete, replies }}
        />
      )}
    </>
  );
};

export default CommentBox;
