import React, { useContext , useState, createContext } from 'react';
import uuid from 'react-uuid';

import { useAuth } from './AuthContext';
import { 
  getDatabase, 
  ref, 
  set, 
  get, 
  child 
} from "firebase/database";

const DbContext = createContext();

export function useDB(){
    return useContext(DbContext)
}

export function DbProvider({children}) {
  const [currentNoteID, setCurrentNoteID] = useState("");
  const [dashboardNoteList, setDashboardNoteList] = useState([]);
  const [noteData, setNoteData] = useState({});

  const [olddata, setOlddata] = useState(false);

  const {currentUser} = useAuth();

  function resetNoteData(){
      setNoteData({})
  }

  function createNote(noteid){
    const db = getDatabase();
    setCurrentNoteID(noteid);
    const createnote = ref(db, 'users/' + "user-" + currentUser.uid + '/notes/' + noteid);
    set(createnote, {
      data: "",
      name : noteid
    })
      .then(() => {
        console.log('note created successfully!') ;
      })
      .catch((error) => {
        console.log('The note create failed...') ;
      });
  }

  const readDashboardNoteList = async () =>{
    setDashboardNoteList([]);
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'users/' + "user-"+ currentUser.uid + '/notes/'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((childsnapshot) => {
            console.log(childsnapshot.val());
            setDashboardNoteList( dashboardData => dashboardData.concat(childsnapshot.val().name));
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
          console.error(error);
      });
  }

  function retreiveNoteID(senddata) {
    let noteid = window.location.pathname.slice(11)
    setCurrentNoteID(noteid)
    console.log("-")
    writeNote(senddata, noteid)
  }

  function writeNote(senddata, noteid){
    console.log(noteid)
    const db = getDatabase();
            
    if(currentNoteID !== null && currentUser.uid !== null){
      const newPostRef = ref(db, 'users/' + "user-" + currentUser.uid + '/notes/' + noteid);
      set(newPostRef, {
        data: senddata,
        name: noteid
      })
      .then(() => {
        console.log('Data saved successfully!') ;
      })
      .catch((error) => {
        console.log('The write failed...') ;
      });
    }else{
      console.log("error - user not login in")
    }
  }

  async function retreiveNote(noteid){
    setNoteData({})
    setOlddata(true)
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'users/' + "user-"+ currentUser.uid + '/notes/'))
      .then((snapshot) => {
        if(snapshot.exists()) {
          snapshot.forEach((childsnapshot) => {
              //console.log(childsnapshot.key);
            if(childsnapshot.key === noteid) {
              setNoteData(childsnapshot.val().data); 
              console.log(childsnapshot.val().data)
            }
          })
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  
  const database = {
      currentNoteID,
      dashboardNoteList,
      noteData,
      olddata,
      setOlddata,
      writeNote,
      retreiveNoteID,
      readDashboardNoteList,
      createNote,
      resetNoteData,
      retreiveNote
  }

  return (
    <DbContext.Provider value={database}>
      {children}
    </DbContext.Provider>
  )
}
