import React from "react";
import { useDispatch } from "react-redux";
import { editReply, editComment} from "../features/general/generalSlice";

const ComBoxEditBtn = ({editBtn}) => {
  const dispatch = useDispatch()
  const {isAReply, id, editContent, parentUser, setEditContent, setIsEdit} = editBtn
  return (
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
  );
};

export default ComBoxEditBtn;
