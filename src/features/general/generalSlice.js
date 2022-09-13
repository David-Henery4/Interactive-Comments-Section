import { createSlice } from "@reduxjs/toolkit";
import commentData from "../../data.json";

// console.log(commentData)

const initialState = {
  currentUser: commentData.currentUser,
  comments: commentData.comments,
  isReplyActive: false,
  isUserReply: false,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    addNewComment: (state, { payload }) => {
      state.comments = [...state.comments, payload];
    },
    addReply: (state, { payload }) => {
      const { replyInfo, id } = payload;
      console.log(replyInfo);
      console.log(id); // WAS HERE
    },
    changeCommentScore: (state, { payload }) => {
      const selectedComment = state.comments.find(
        (com) => com.id === payload.id
      );
      if (payload.changeType === "inc") {
        selectedComment.score++;
      }
      if (payload.changeType === "dec") {
        selectedComment.score--;
      }
      if (selectedComment.score < 0) {
        selectedComment.score = 0;
      }
    },
    toggleIsReplyActive: (state, { payload }) => {
      state.isReplyActive = !state.isReplyActive;
    },
  },
});

export const {
  addNewComment,
  changeCommentScore,
  toggleIsReplyActive,
  addReply,
} = generalSlice.actions;

export default generalSlice.reducer;
