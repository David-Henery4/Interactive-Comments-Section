import React from "react";
import { useSelector } from "react-redux";
import { CommentBox, InputBox, Modal } from "../components";

const MainContent = () => {
  const { comments, currentUser } = useSelector((store) => store.general);
  // HAVE FUNCTION HERE TO PASS INTO COMMENTS BOX, RECIEVES PARAMS, THEN PASS THEM AS PROPS INTO MODAL TO CALL THE DELETE.
  // OR USE SEND THE PARAMS FROM COMMENT BOX DIRECTLY FROM COMMENT BOX INTO SLICE THEN USE "USE SELECTOR" to grab in the modal (TRY THIS LAST!!!!!!!!!)
  return (
    <main className="content-layout">
      <Modal/>
      {comments.map((com) => {
        return <CommentBox key={com.id} {...com} />;
      })}
      <InputBox {...currentUser} name={"SEND"}/>
    </main>
  );
};

export default MainContent;
