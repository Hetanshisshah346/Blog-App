// authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Notiflix from "notiflix";
import { NavigateFunction } from "react-router-dom";

interface ArticleData {
  _id: string;
  title: string;
  description: string;
  category: string;
  slug: string;
}

interface Article {
  data: ArticleData;
}

interface AuthState {
  isLoggedIn: boolean;
  data: ArticleData | null;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  data: null,
  error: null,
};

export const ListArticleAsync = createAsyncThunk(
  "article/allShow",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (searchTerm: any) => {
    const url = `http://192.168.1.60:3000/article/allShow?search=${searchTerm}`;
    const response = await axios.get(url);
    return response.data as Article;
  }
);

export const EditArticleAsync = createAsyncThunk(
  "article/update",
  async (args: { id: Article; navigate: NavigateFunction }) => {
    const { id, navigate } = args;
    try {
   
      const url = `http://192.168.1.60:3000/article/update`;
      const response = await axios.post(url, id);
      if (response.data.status === true) {
        Notiflix.Notify.success("Article updated successfully!");
        navigate("/");
        return response.data as Article;
      }
    } catch (error) {
      Notiflix.Notify.failure("something went wrong");
    }
  }
);
export const CreateArticleAsync = createAsyncThunk(
  "article/create",
  async (args: { id: Article; navigate: NavigateFunction }) => {
    const { id, navigate } = args;
    try {
      const url = `http://192.168.1.60:3000/article/create`;
      const response = await axios.post(url, id);
      if (response.data.status === true) {
        Notiflix.Notify.success("Article created successfully!");
        navigate("/");
        return response.data as Article;
      }
    } catch (error) {
      Notiflix.Notify.failure("something went wrong");
    }
  }
);


// Create slice
const authSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        ListArticleAsync.fulfilled,
        (state, action: PayloadAction<Article>) => {
          state.isLoggedIn = true;
          state.data = action.payload?.data;
          state.error = null;
        }
      )
      .addCase(ListArticleAsync.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.data = null;
        state.error = action.error.message as string;
      })
      .addCase(
        EditArticleAsync.fulfilled,
        (state, action: PayloadAction<Article>) => {
          state.isLoggedIn = true;
          state.data = action.payload?.data;
          state.error = null;
        }
      )
      .addCase(EditArticleAsync.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.data = null;
        state.error = action.error.message as string;
      })
      .addCase(
        CreateArticleAsync.fulfilled,
        (state, action: PayloadAction<Article>) => {
          state.isLoggedIn = true;
          state.data = action.payload?.data;
          state.error = null;
        }
      )
      .addCase(CreateArticleAsync.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.data = null;
        state.error = action.error.message as string;
      });
  },
});

export default authSlice.reducer;
