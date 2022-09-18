import React from "react";
import { useDispatch } from "react-redux";
import { Delete, Edit} from "../images/svgs/index";
import { toggleModalAndOverlay } from "../features/general/generalSlice";

const ComBoxDelEdit = ({delEdit}) => {
  const dispatch = useDispatch()
  const {handleDelete,handleEdit,id} = delEdit
  return (
    <div className="comment-box-delEdit">
      <div
        className="comment-box-delete"
        onClick={() => {
          dispatch(toggleModalAndOverlay());
          handleDelete(id);
        }}
      >
        <Delete />
        <p>Delete</p>
      </div>
      <div className="comment-box-edit" onClick={() => handleEdit(id)}>
        <Edit />
        <p>Edit</p>
      </div>
    </div>
  );
};

export default ComBoxDelEdit;
