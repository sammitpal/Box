import React, { useState, useEffect } from "react";
import { useStateValue } from "./StateProvider";
import { database } from "./firebase";
import './Row.css';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from "@material-ui/core";
function Row() {
  const [{ user }, dispatch] = useStateValue();
  const [files, setFile] = useState([{}]);
  useEffect(()=>{
    if(user)
    {
     database.collection("user").doc(user?.uid).collection("files").onSnapshot(snapshot=>{
       setFile(snapshot.docs.map(doc => ({
         id: doc.id,
         file: doc.data().filename,
         link: doc.data().link
       })));
     })
    } else{
      setFile([]);
    }
   },[user])
   console.log(files);
  return (
    <div className="item">
      {
        files.map((file)=>(
          <div className="each_file">
            
            <p>{file.file}</p>
            <div className="fileaction">
            <Button href={file.link} target="_blank"><GetAppIcon/></Button>
            <Button onClick={(e) =>
              database
                .collection("user")
                .doc(user?.uid)
                .collection("files")
                .doc(file.id)
                .delete()
            }><DeleteIcon/></Button>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default Row;
