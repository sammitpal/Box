import { Add } from '@material-ui/icons'
import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'
import Body from './components/Body'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { database, storage } from './firebase'
import './Home.css'
import { useStateValue } from './StateProvider'
function Home() {
    const [{ user }, dispatch] = useStateValue();
    const [myfile, setFile] = useState();
    const [progress, setProgress] = useState(0);
    const history = useHistory();
    const handleChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setFile(file);
            const uploadTask = storage.ref(`${user?.uid}/files/${file?.name}`).put(file);
            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress);
                },
                error => {
                    window.alert(error)
                },
                () => {
                    storage.ref(user?.uid)
                        .child(`files/${file?.name}`)
                        .getDownloadURL()
                        .then(url => {
                            window.alert("File Uploaded Successfully");
                            setProgress(0);
                            setFile(null);
                            console.log(url);
                            database.collection("user").doc(user?.uid).collection("files").add({
                                filename: file?.name,
                                link: url
                            })
                        });

                }
            )
        }
    };
    return (
        <div>
            <Navbar/>
            <div className="content">
                <div className="left">
                <Sidebar className="sidebar"/>
            
                </div>
                <div className="right">
                <Body/>
                </div>
                <div class="addFile">
                <label for="upload"><Add/></label>
                <input type="file" onChange={handleChange} multiple id="upload" />
                </div>
            </div>
            
        </div>
    )
}

export default Home
