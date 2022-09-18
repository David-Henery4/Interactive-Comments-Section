import React from "react";

const ComBoxComment = ({ContentDetails}) => {
  const {isEdit, editContent, setEditContent, isReplyComment, content, replyingTo} = ContentDetails;
  return (
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
  );
};

export default ComBoxComment;
