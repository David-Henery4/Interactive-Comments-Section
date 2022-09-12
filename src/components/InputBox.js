import React from "react";
import user from "../images/avatars/image-juliusomo.png";

const InputBox = () => {
  return (
    <section className="input-box">
      <div className="input-box-text-wrap">
        <textarea
          name="comment"
          id="comment"
          className="input-box-text-wrap__text"
          placeholder="Add a comment..."
        ></textarea>
      </div>
      <div className="input-box-user-wrap">
        <img src={user} alt="user-img" className="input-box-user-wrap__img" />
      </div>
      <button className="input-box__btn">SEND</button>
    </section>
  );
};

export default InputBox;
