import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/contacts");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkAPI) => {
    try {
      await axios.post("/contacts", contact);
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
      const { data } = await axios.delete(`/contacts/${id}`);
      thunkAPI.dispatch(fetchContacts());
      toast.success(`${data.name}'s contact is deleted!`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async (contact, thunkAPI) => {
    try {
      const { data } = await axios.patch(
        `/contacts/${contact.id}`,
        contact.info
      );
      thunkAPI.dispatch(fetchContacts());
      toast.success(`${data.name}'s contact is updated!`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
