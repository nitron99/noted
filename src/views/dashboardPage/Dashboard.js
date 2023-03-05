import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './dashboard.css'
import uuid from 'react-uuid'
import Card from '../../components/card';
import { useDB } from '../../contexts/firebase-db'
import { useAuth } from '../../contexts/AuthContext'


function Dashboard() {

    //const [data, setData] = useState()
    const navigate = useNavigate();

    const [edit, setEdit] = useState(false)

    const {currentUser} = useAuth();
    const {dashboardNoteList, readDashboardNoteList, createNote, retreiveNote, resetNoteData, noteData} = useDB();
      
    useEffect(() => {
      let isSubscribed = true;

      if(isSubscribed) readDashboardNoteList()
      return () => (isSubscribed = false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    useEffect(() => {
      let isSubscribed = true;

      if(isSubscribed) setEdit(true)
      return () => (isSubscribed = false)
    }, [noteData]);

  
    function generateapage(){
        const temp = uuid();
        createNote(temp)
        resetNoteData()
        navigate(`/dashboard/${temp}`)
    }

    const clicked = (e) => {
      //let redirect = JSON.stringify(e).slice(10)
      retreiveNote(e).then(()=>{
        console.log("work complete")
        console.log(noteData)
        if(edit) 
        {
          navigate(`/dashboard/${e}`)
        }
      })  
    }
  

  return (
    <div className='dashboard-container'>
        <div className='vertical-bar1'></div>
        <div className='vertical-bar2'></div>
        <div className='dashboard-topbar'>
          <div className='dashboard-heading'>Dashboard</div>
        </div>
        <div className='home-divider'></div>
        <button className='dashboard-create-btn'onClick={generateapage}>create note</button>
        <div className='home-divider'></div>
        
          <div className='dashboard-card-panel'>
              Last Created Notes
              <div className='dashboard-card-grid'>
              {dashboardNoteList.map((item,index)=> {
                return(
                  <Card data={item} key={index} click={clicked}/>
                )
              })}
              </div>
            </div>
       
    </div>

  )
}

export default Dashboard