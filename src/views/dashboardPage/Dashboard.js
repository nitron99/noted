import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import uuid from 'react-uuid';

import Card from '../../components/card';

// contexts
import { useDB } from '../../contexts/firebase-db';
import { useAuth } from '../../contexts/AuthContext';

import './styles.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    dashboardNoteList, 
    readDashboardNoteList, 
    createNote,
    retreiveNote, 
    resetNoteData, 
    noteData,
    deleteNote
  } = useDB();
  const { currentUser, logout } = useAuth();
  const [edit, setEdit] = useState(false);
    
  useEffect(() => {
    readDashboardNoteList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    setEdit(true)
  }, [noteData]);

  const handleGenerateNote = () => {
    let id = uuid();
    createNote(id);
    resetNoteData();
    navigate(`/dashboard/${id}`)
  }

  const handleNoteOpen = (id) => {
    //let redirect = JSON.stringify(e).slice(10)
    retreiveNote(id).then(()=>{
      console.log("work complete");
      console.log(noteData);
      if(edit) navigate(`/dashboard/${id}`);
    })  
  }

  const handleDelete = (id) => {
    deleteNote(id).then(() => {
      console.log("done");
    })
  }

  return (
    <div className='dashboard-container'>
      <div className='vertical-bar1'></div>
      <div className='vertical-bar2'></div>
      <div className='dashboard-topbar'>
        <div className='dashboard-heading'>Dashboard</div>
        <Link to="/signup">
          <button className='home-navbar-btn' onClick={() => logout()}>
            Log out
          </button>
        </Link>
      </div>
      <div className='home-divider' />
      <button className='dashboard-create-btn' onClick={handleGenerateNote}>
        create note
      </button>
      <div className='home-divider' />
      
        <div className='dashboard-card-panel'>
          Last Created Notes
          <div className='dashboard-card-grid'>
          {dashboardNoteList.map((item, index)=> {
            let name = "Untitled";

            if(item.data !== ""){
              try {
                name = item.data.blocks[0].data.text || "Untitled";
                name = name.replace(/&nbsp;/g, "");
                if(item.data.blocks.length > 1) name = name + "...";
              } catch (err) {
                name = "Untitled"
              }
            }

            return(
              <Card 
                key={index} 
                data={name} 
                onClick={() => handleNoteOpen(item.name)} 
                onDelete={() => handleDelete(item.name)}
                />
            )
          })}
          </div>
        </div>
    </div>
  )
}

export default Dashboard;