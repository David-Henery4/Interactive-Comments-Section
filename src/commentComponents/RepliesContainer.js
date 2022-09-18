import React from "react";
import {CommentBox} from "../components"

const RepliesContainer = ({repliesWrap}) => {
  const {currentUser,user,getInfoForDelete,replies} = repliesWrap
  return (
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
              getInfoForDelete={getInfoForDelete}
            />
          );
        }
        return (
          <CommentBox
            key={rep.id}
            {...rep}
            isReplyComment={true}
            parentUser={user.username}
            getInfoForDelete={getInfoForDelete}
          />
        );
      })}
    </div>
  );
};

export default RepliesContainer;
