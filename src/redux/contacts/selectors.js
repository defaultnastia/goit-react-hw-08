import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "../filters/selectors";

export const selectContacts = (state) => state.contacts.items;

export const selectError = (state) => state.contacts.error;

export const selectLoading = (state) => state.contacts.loading;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    const filteredContacts = contacts?.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredContacts?.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    });
  }
);
