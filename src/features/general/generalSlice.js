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
    
  },
});

export default generalSlice.reducer