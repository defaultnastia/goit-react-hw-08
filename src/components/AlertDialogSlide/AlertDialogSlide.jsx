import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { forwardRef } from "react";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import css from "./AlertDialogSlide.module.css";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  handleOpenAlert,
  currentContact,
  openAlert,
}) {
  const dispatch = useDispatch();

  return (
    <Dialog
      open={openAlert}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => {
        handleOpenAlert(false);
      }}
      aria-describedby="alert-dialog-description"
      className={css.dialog}
    >
      <DialogTitle>
        {`Are you sure you want to delete the ${currentContact?.name}'s contact?`}
      </DialogTitle>
      <DialogActions>
        <Button
          onClick={() => {
            handleOpenAlert(false);
          }}
        >
          No
        </Button>
        <Button
          className={css.yes}
          onClick={() => {
            dispatch(deleteContact(currentContact?.id));
            handleOpenAlert(false);
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
