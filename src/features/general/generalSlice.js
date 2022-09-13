import { createSlice } from "@reduxjs/toolkit";
import commentData from "../../data.json";

// console.log(commentData)

const initialState = {
  user: commentData.currentUser,
  comments: commentData.comments,
  isReply: false,
  isUserReply: false,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    addNewComment: (state,{payload}) => {
      state.comments = [...state.comments, payload]
    },
    changeCommentScore: (state, {payload}) => {
      const selectedComment = state.comments.find(com => com.id === payload.id)
      if (payload.changeType === "inc") {
        selectedComment.score++;
      }
      if (payload.changeType === "dec") {
        selectedComment.score--
      }
      if (selectedComment.score < 0){
        selectedComment.score = 0
      }
    },
  },
});


export const {addNewComment, changeCommentScore} = generalSlice.actions

export default generalSlice.reducer