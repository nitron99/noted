import React, { useContext , useState, createContext } from 'react';
import { useAuth } from './AuthContext';
import { 
  getDatabase, 
  ref, 
  set, 
  get, 
  child,
  remove
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

  const { currentUser } = useAuth();

  function resetNoteData(){
    setNoteData({})
  }

  // ---------------------------- GET: CREATE NOTE ------------------------------
  function createNote(noteId){
    const db = getDatabase();
    setCurrentNoteID(noteId);
    console.log(db);
    // eslint-disable-next-line no-useless-concat
    const createnote = ref(db, 'users/' + "user-" + currentUser.uid + '/notes/' + noteId);
    set(createnote, {
      data: "",
      name : noteId
    })
      .then(() => {
        console.log('note created successfully!') ;
      })
      .catch((error) => {
        console.log('The note create failed...', error) ;
      });
  }

  // ---------------------------- GET: GET NOTES LIST FOR DASHBOARD -------------
  const readDashboardNoteList = async () => {
    setDashboardNoteList([]);
    const dbRef = ref(getDatabase());
    // eslint-disable-next-line no-useless-concat
    get(child(dbRef, 'users/' + "user-"+ currentUser.uid + '/notes/'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((childsnapshot) => {
            // console.log(childsnapshot.val());
            setDashboardNoteList(dashboardData => dashboardData.concat(childsnapshot.val()));
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // ---------------------------- POST: WRITE NOTE ------------------------------
  function writeNote(sendData){
    let noteId = window.location.pathname.slice(11)
    console.log(noteId)
    setCurrentNoteID(noteId);

    const db = getDatabase();
  
    if(currentNoteID !== null && currentUser.uid !== null){
      // eslint-disable-next-line no-useless-concat
      const newPostRef = ref(db, 'users/' + "user-" + currentUser.uid + '/notes/' + noteId);
      set(newPostRef, {
        data: sendData,
        name: noteId
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

  // ---------------------------- GET: GET SPECIFICE NOTE -----------------------
  async function retreiveNote(noteId){
    setNoteData({});
    setOlddata(true);
    const dbRef = ref(getDatabase());
    // eslint-disable-next-line no-useless-concat
    get(child(dbRef, 'users/' + "user-"+ currentUser.uid + '/notes/'))
      .then((snapshot) => {
        if(snapshot.exists()) {
          snapshot.forEach((childsnapshot) => {
            if(childsnapshot.key === noteId) {
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

  // ---------------------------- DELETE: DELETE NOTE ---------------------------
  async function deleteNote (noteId) {
    console.log(noteId);
    const db = getDatabase();
    if(currentNoteID !== null && currentUser.uid !== null){
      // eslint-disable-next-line no-useless-concat
      const deleteNoteRef = ref(db, 'users/' + "user-" + currentUser.uid + '/notes/' + noteId);
      remove(deleteNoteRef)
        .then(() => {
          console.log('Data Deleted successfully!');
        })
        .catch((error) => {
          console.log('delet failed...') ;
        });
    }else{
      console.log("error - user not login in")
    }

    // refresh Dashboard list
    readDashboardNoteList();
  }
  
  const database = {
    currentNoteID,
    dashboardNoteList,
    noteData,
    olddata,
    setOlddata,
    writeNote,
    readDashboardNoteList,
    createNote,
    resetNoteData,
    retreiveNote,
    deleteNote
  }

  return (
    <DbContext.Provider value={database}>
      {children}
    </DbContext.Provider>
  )
}
