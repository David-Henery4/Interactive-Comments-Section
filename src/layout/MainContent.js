import React from "react";
import { useSelector } from "react-redux";
import { CommentBox, InputBox } from "../components";

const MainContent = () => {
  const { comments, currentUser } = useSelector((store) => store.general);
  return (
    <main className="content-layout">
      {comments.map((com) => {
        return <CommentBox key={com.id} {...com} />;
      })}
      <InputBox {...currentUser} name={"SEND"}/>
    </main>
  );
};

export default MainContent;
