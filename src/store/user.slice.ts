import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getStorageState } from "../helpers/Storage";
import axios, { AxiosError } from "axios";
import {
  IUserState,
  LoginResponse,
  UserStorageKeys,
  UserPersistent,
} from "../Interfaces/auth.interface";
import { BASE_URL } from "../helpers/API";
import { IProfile } from "../Interfaces/user.interface";
import { RootState } from "./store";

const initialState: IUserState = {
  jwt: getStorageState<UserPersistent>(UserStorageKeys.UserData)?.jwt ?? null,
  userProfile: null,
};

export const getLogin = createAsyncThunk(
  "user/getLogin",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(
        `${BASE_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }
);

export const getUserProfile = createAsyncThunk<
  IProfile,
  void,
  { state: RootState }
>("user/getUserProfile", async (_, thunkApi) => {
  const { data } = await axios.get<IProfile>(`${BASE_URL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${thunkApi.getState().user.jwt}`,
    },
  });
  return data;
});

export const sendRegistration = createAsyncThunk(
  "user/registration",
  async (userData: { [key: string]: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(
        `${BASE_URL}/auth/register`,
        {
          ...userData,
        }
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
      state.userProfile = null;
    },
    clearLoginErrorMessage: (state) => {
      state.loginErrorMessage = undefined;
    },
    registerErrorMessage: (state) => {
      state.registerErrorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLogin.fulfilled, (state, action) => {
      if (action.payload) {
        state.jwt = action.payload.access_token;
      }
      return;
    });
    builder.addCase(getLogin.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      if (action.payload) {
        state.userProfile = action.payload;
      }
      return;
    });
    builder.addCase(getUserProfile.rejected, (state) => {
      state.userProfile = null;
    });
    builder.addCase(sendRegistration.fulfilled, (state, action) => {
      if (action.payload) {
        state.jwt = action.payload.access_token;
      }
      return;
    });
    builder.addCase(sendRegistration.rejected, (state, action) => {
      state.registerErrorMessage = action.error.message;
      console.log(state.registerErrorMessage);
    });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
