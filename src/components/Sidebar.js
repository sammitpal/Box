import React, { useState } from "react";
import "./Sidebar.css";
import AddIcon from "@material-ui/icons/Add";
import { useStateValue } from "../StateProvider";
import { storage, database } from "../firebase";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
function Sidebar() {
  const [{ user }, dispatch] = useStateValue();
  const [myfile, setFile] = useState();
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = React.useState(false);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      setOpen(true);
      const uploadTask = storage
        .ref(`${user?.uid}/files/${file?.name}`)
        .put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(progress);
        },
        (error) => {
          window.alert(error);
        },
        () => {
          storage
            .ref(user?.uid)
            .child(`files/${file?.name}`)
            .getDownloadURL()
            .then((url) => {
              window.alert("File Uploaded Successfully");
              setProgress(0);
              setFile(null);
              setOpen(false);
              console.log(url);
              database
                .collection("user")
                .doc(user?.uid)
                .collection("files")
                .add({
                  filename: file?.name,
                  link: url,
                });
            });
        }
      );
    }
  };


  return (
    <div className="sidebar">
      <Dialog aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title">
          Please Wait...
        </DialogTitle>
        <DialogContent dividers>
            <DialogContentText>
                Uploading {progress} %
            </DialogContentText>
         <progress value = {progress} max="100"/>
        </DialogContent>
      </Dialog>
      <div className="sidebar_items">
        {user ? (
          <label for="upload">
            <p>
              <AddIcon />
              <span>Add New</span>
            </p>
            <input type="file" onChange={handleChange} multiple id="upload" />
          </label>
        ) : (
          <Link to="/login">
            <label for="upload">
              <p>
                <AddIcon />
                <span>Add New</span>
              </p>
              <input type="file" multiple id="upload" />
            </label>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
