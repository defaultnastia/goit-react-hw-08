import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const mockInstance = axios.create({
  baseURL: "https://667d4741297972455f645a16.mockapi.io/v1",
});

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await mockInstance.get("/contacts");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/adContact",
  async (contact, thunkAPI) => {
    try {
      await mockInstance.post("/contacts", contact);
      thunkAPI.dispatch(fetchContacts());
      toast.success("New contact is added!");
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    try {
      const { data } = await mockInstance.delete(`/contacts/${id}`);
      thunkAPI.dispatch(fetchContacts());
      toast.success(`${data.name}'s contact is deleted!`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
