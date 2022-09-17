import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment, deleteReply, toggleModalAndOverlay } from "../features/general/generalSlice";

const Modal = ({ parentUser, id, isAReply }) => {
  const dispatch = useDispatch()
  const { isModalAndOverlayActive } = useSelector((store) => store.general);
  //
  const handleDelete = () => {
    if (isAReply) {
      dispatch(deleteReply({ id, parentUser }))
    }
    if (!isAReply) {
      dispatch(deleteComment(id))
    }
    dispatch(toggleModalAndOverlay())
  }
  //
  return (
    <div className={isModalAndOverlayActive ? "modal modal-active" : "modal"}>
      <p className="modal__title">Delete Comment</p>
      <p className="modal__text">
        Are you sure you want to delete this comment? This will remove the
        comment and can't be undone.
      </p>
      <div className="modal-btns">
        <button
          className="modal-btns__cancel"
          onClick={() => dispatch(toggleModalAndOverlay())}
        >
          NO, CANCEL
        </button>
        <button className="modal-btns__delete" onClick={handleDelete}>
          YES, DELETE
        </button>
      </div>
    </div>
  );
};

export default Modal;
