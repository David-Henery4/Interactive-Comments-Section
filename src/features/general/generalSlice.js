import { createSlice } from "@reduxjs/toolkit";
import commentData from "../../data.json";

// console.log(commentData)

const initialState = {
  currentUser: commentData.currentUser,
  comments: commentData.comments,
  // replies: [],
  isReplyActive: false,
  isActiveComment: false,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    addNewComment: (state, { payload }) => {
      state.comments = [...state.comments, payload];
    },
    deleteComment: (state, { payload }) => {
      const filteredComments = state.comments.filter(
        (com) => com.id !== payload
      );
      state.comments = filteredComments;
    },
    deleteReply: (state, {payload}) => {
      console.log(payload)
    },
    editComment: (state, { payload }) => {
      const { id, editContent } = payload;
      const editedComment = state.comments.find((com) => com.id === id);
      editedComment.content = editContent;
    },
    editReply: (state, {payload}) => {
      console.log(payload)
    },
    addReply: (state, { payload }) => {
      const { replyInfo, id } = payload;
      const replyedToComment = state.comments.find((c) => c.id === id);
      replyedToComment.replies = [...replyedToComment.replies, replyInfo];
    },
    addReplyToReply: (state, {payload}) => {
      console.log(payload)
      const parentComment = state.comments.find(
        (com) => com.user.username === payload.parentUser
      );
      const replies = parentComment.replies
      parentComment.replies = [...replies, payload.replyInfo]
    },
    currActiveComment: (state, { payload }) => {
      state.comments.forEach((c) => {
        if (c.id === payload) {
          state.isActiveComment = !state.isActiveComment;
          c.isCommentActive = state.isActiveComment;
        }
        if (c.id !== payload) {
          c.isCommentActive = false;
        }
        if (payload === "reset") {
          c.isCommentActive = false;
          state.isActiveComment = false;
        }
      });
    },
    currActiveReply: (state, { payload }) => {
      console.log(payload);
      const parentComment = state.comments.find(
        (com) => com.user.username === payload.parentUser
      );
      parentComment.replies.forEach((rep) => {
        if (rep.id === payload.id) {
          state.isActiveComment = !state.isActiveComment;
          rep.isCommentActive = state.isActiveComment;
        }
        if (rep.id !== payload.id) {
          rep.isCommentActive = false;
        }
        if (payload === "reset") {
          rep.isCommentActive = false;
          state.isActiveComment = false;
        }
      });
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
  currActiveComment,
  deleteComment,
  editComment,
  currActiveReply,
  addReplyToReply,
  deleteReply,
  editReply
} = generalSlice.actions;

export default generalSlice.reducer;
