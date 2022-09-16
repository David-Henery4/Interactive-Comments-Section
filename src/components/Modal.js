import React from "react";

const Modal = () => {
  return (
    <div className="modal">
      <p className="modal__title">Delete Comment</p>
      <p className="modal__text">
        Are you sure you want to delete this comment? This will remove the
        comment and can't be undone.
      </p>
      <div className="modal-btns">
        <button className="modal-btns__cancel">NO, CANCEL</button>
        <button className="modal-btns__delete">YES, DELETE</button>
      </div>
    </div>
  );
};

export default Modal;
