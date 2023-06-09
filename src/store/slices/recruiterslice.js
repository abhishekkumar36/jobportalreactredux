import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const recruiterSignin = createAsyncThunk(
  "recruiterSignin",
  async (recruiterSigninDetails) => {
    try {
      const response = await fetch("http://localhost:8001/recruiter/signin", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(recruiterSigninDetails),
      });
      const result = await response.json();
      if (result.token)
        localStorage.setItem("rtoken", JSON.stringify(result?.token));
      return result;
    } catch (error) {
      return error;
    }
  }
);
export const recruiterSignUp = createAsyncThunk(
  "recruiterSignUp",
  async (recruiterSignUpDetails) => {
    try {
      const response = await fetch("http://localhost:8001/recruiter/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(recruiterSignUpDetails),
      });
      const result = await response.json();
      if (result.token)
        localStorage.setItem("rtoken", JSON.stringify(result?.token));
      return result;
    } catch (error) {
      return error;
    }
  }
);

const initialState = {
  recruiter: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    address: "",
  },
  loading: false,
  error: null,
};

const recruiterSlice = createSlice({
  name: "recruiterSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(recruiterSignUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(recruiterSignUp.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      })
      .addCase(recruiterSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(recruiterSignin.pending, (state) => {
        state.loading = true;
      })
      .addCase(recruiterSignin.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status === 409) {
          state.error = action.payload.message;
        } else if (action.payload === 200) {
          state.recruiter = { ...action.payload.data };
          console.log(action.payload);
          state.error = null;
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(recruiterSignin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default recruiterSlice.reducer;

// interface IinitialState {
//   jobseeker: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     mobileNumber: string;
//     address?: string | undefined;
//     jobseekerJwt: string;
//   };
// }
