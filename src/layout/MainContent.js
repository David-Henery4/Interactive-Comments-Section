import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CommentBox, InputBox, Modal } from "../components";

const MainContent = () => {
  const { comments, currentUser } = useSelector((store) => store.general);
  const [delInfo,setDelInfo] = useState({})
  //
  const getInfoForDelete = (deleteInfo) => {
    setDelInfo(deleteInfo)
  }
  //
  return (
    <main className="content-layout">
      <Modal {...delInfo}/>
      {comments.map((com) => {
        return <CommentBox key={com.id} {...com} getInfoForDelete={getInfoForDelete}/>;
      })}
      <InputBox {...currentUser} name={"SEND"}/>
    </main>
  );
};

export default MainContent;
