import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCommentScore,
  toggleIsReplyActive,
  currActiveComment,
  deleteComment,
  editComment,
  currActiveReply,
  editReply,
  deleteReply,
  changeReplyScore,
} from "../features/general/generalSlice";
import InputBox from "./InputBox";
import holderProfilePic from "../images/avatars/image-amyrobson.png";
import { del, edit, minus, plus, reply } from "../images";

const CommentBox = ({
  id,
  content,
  createdAt,
  replies,
  score,
  user,
  replyingTo = "",
  parentUser = "",
  isCommentActive = false,
  isUserComment = false,
  isReplyComment = false,
  isAReply = false,
}) => {
  const { currentUser, isReplyActive, comments } = useSelector(
    (store) => store.general
  );
  const dispatch = useDispatch();
  const { image, username } = user;
  const [isEdit, setIsEdit] = useState(false);
  const [editContent, setEditContent] = useState("");
  //
  const handleCommentVotes = (changeType) => {
    if (isReplyComment) {
      dispatch(changeReplyScore({ id, changeType, parentUser }));
    }
    if (!isReplyComment) {
      dispatch(changeCommentScore({ id, changeType }));
    }
  };
  //
  const handleDelete = (id) => {
    if (isAReply) {
      dispatch(deleteReply({ id, parentUser }));
    }
    if (!isAReply) {
      dispatch(deleteComment(id));
    }
  };
  //
  const handleEdit = (id) => {
    setIsEdit(true); // MIGHT be toggle
    setEditContent(content); // could add to useState directly
  };
  //
  // const grabRepliesList = () => {
  //   // comments.find((com) => )
  // }
  // //
  // useEffect(() => {

  // }, [])
  //
  return (
    <>
      <div className={isReplyComment ? "comment-box reply" : "comment-box"}>
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
          <p className="comment-box__post-date">{createdAt}</p>
        </div>
        <div className="comment-box-comment">
          {isEdit ? (
            <div className="input-box-text-wrap">
              <textarea
                name="edit-comment"
                id="edit-comment"
                className="input-box-text-wrap__text"
                value={editContent}
                placeholder="Add a comment..."
                onChange={(e) => {
                  setEditContent(e.target.value);
                }}
              ></textarea>
            </div>
          ) : (
            <p className="comment-box-comment__text">
              {isReplyComment ? `@${replyingTo} ${content}` : `${content}`}
            </p>
          )}
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
        {isUserComment ? (
          <div className="comment-box-delEdit">
            <div
              className="comment-box-delete"
              onClick={() => handleDelete(id)}
            >
              <img src={del} alt="delete-icon" />
              <p>Delete</p>
            </div>
            <div className="comment-box-edit" onClick={() => handleEdit(id)}>
              <img src={edit} alt="edit-icon" />
              <p>Edit</p>
            </div>
          </div>
        ) : (
          <div
            className="comment-box-reply"
            onClick={() => {
              dispatch(toggleIsReplyActive());
              if (!isReplyComment) {
                dispatch(currActiveComment(id));
              }
              if (isReplyComment) {
                // was hee
                dispatch(
                  currActiveReply({ id, replyingTo, username, parentUser })
                );
              }
            }}
          >
            <img
              src={reply}
              alt="reply-icon"
              className="comment-box-reply__icon"
            />
            <p className="comment-box-reply__text">Reply</p>
          </div>
        )}
        {isEdit && (
          <button
            form="edit-comment"
            className="input-box__btn"
            onClick={() => {
              if (isAReply) {
                dispatch(editReply({ id, editContent, parentUser }));
              }
              if (!isAReply) {
                dispatch(editComment({ id, editContent }));
              }
              setEditContent("");
              setIsEdit(false);
            }}
          >
            UPDATE
          </button>
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
        <div className="replies-container">
          {replies.map((rep) => {
            if (currentUser.username === rep.user.username) {
              return (
                <CommentBox
                  key={rep.id}
                  {...rep}
                  isReplyComment={true}
                  parentUser={user.username}
                  isUserComment = {true}
                  isAReply={true}
                />
              );
            }
            return (
              <CommentBox
                key={rep.id}
                {...rep}
                isReplyComment={true}
                parentUser={user.username}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default CommentBox;
