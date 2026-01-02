import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../api/blog";

export const createBlogThunk = createAsyncThunk(
  "blogs/create",
  async (blogData: any, thunkAPI: any) => {
    try {
      return await createBlog(blogData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// GET ALL
export const getBlogsThunk = createAsyncThunk(
  "blogs/getAll",
  async (_, thunkAPI: any) => {
    try {
      const response = await getBlogs();
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// GET BY ID
export const getBlogByIdThunk = createAsyncThunk(
  "blogs/getById",
  async (id: any, thunkAPI: any) => {
    try {
      return await getBlogById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// UPDATE
export const updateBlogThunk = createAsyncThunk(
  "blogs/update",
  async (
    { id, updatedData }: { id: any; updatedData: any },
    thunkAPI: any
  ) => {
    try {
      return await updateBlog(id, updatedData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// DELETE
export const deleteBlogThunk = createAsyncThunk(
  "blogs/delete",
  async (id: any, thunkAPI: any) => {
    try {
      return await deleteBlog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* =======================
   SLICE
======================= */

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [] as any[],
    blog: null as any,
    loading: false,
    error: null as any,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET ALL
      .addCase(getBlogsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlogsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(getBlogsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createBlogThunk.fulfilled, (state, action) => {
        state.blogs.push(action.payload.data);
      })

      // GET BY ID
      .addCase(getBlogByIdThunk.fulfilled, (state, action) => {
        state.blog = action.payload.data;
      })

      // UPDATE
      .addCase(updateBlogThunk.fulfilled, (state, action) => {
        const index = state.blogs.findIndex(
          (b) => b._id === action.payload.data._id
        );
        if (index !== -1) {
          state.blogs[index] = action.payload.data;
        }
      })

      // DELETE
      .addCase(deleteBlogThunk.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter(
          (b) => b._id !== action.payload.data._id
        );
      });
  },
});

export default blogSlice.reducer;
