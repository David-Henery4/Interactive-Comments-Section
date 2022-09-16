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
  toggleModalAndOverlay
} from "../features/general/generalSlice";
import InputBox from "./InputBox";
import {Delete, Edit, Minus, Plus, Reply} from "../images/svgs/index";

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
  const [voted,setVoted] = useState(false) // save to local storage
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
              {isReplyComment ? (
                <>
                  <span className="comment-box-comment__reply-to">
                    @{replyingTo.concat(" ")}
                  </span>
                  {content}
                </>
              ) : (
                `${content}`
              )}
            </p>
          )}
        </div>
        <div className="comment-box-likes">
          <button
            className="comment-box__plus"
            disabled={voted}
            onClick={(e) => handleCommentVotes("inc", e)
            }
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
        {isUserComment ? (
          <div className="comment-box-delEdit">
            <div
              className="comment-box-delete"
              onClick={() => handleDelete(id)}
            >
              <Delete />
              <p>Delete</p>
            </div>
            <div className="comment-box-edit" onClick={() => handleEdit(id)}>
              <Edit />
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
            <Reply className="comment-box-reply__icon" />
            <p className="comment-box-reply__text">Reply</p>
          </div>
        )}
        {isEdit && (
          <button
            form="edit-comment"
            className="input-box__btn comment-box-edit__active-btn"
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
                  isUserComment={true}
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
