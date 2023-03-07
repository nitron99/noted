import React, { useState, useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';

// contexts
import { useDB } from '../../contexts/firebase-db';
import { useAuth } from '../../contexts/AuthContext';

import './styles.css';

const Note = () => {
  const { currentUser } = useAuth();
  const { 
    writeNote, 
    noteData, 
    olddata, 
    setOlddata, 
    retreiveNoteID, 
    currentNoteID 
  } = useDB();
  const [edit, setEdit] = useState(false);


  useEffect(()=>{
    console.log(noteData)
    if(olddata)
    {
      if(Object.keys(noteData).length === 0) 
      {
        setEdit(false)
      }else{
        console.log("empty");
        setEdit(true)
      }
      setOlddata(false)
    }else{//new page
      setEdit(true)
    }
  }, [noteData])


  const settings = { 
    tools: { 
      header: {
        class: Header,
        config: {
          placeholder: 'Enter a header',
          levels: [2, 3, 4],
          defaultLevel: 3
        }
      }
    },
    // data : {
    //   blocks: [
    //     {
    //       data: {text: 'this is saved page'},
    //       id: "3AFrKNTkb7",
    //       type: "paragraph"
    //   }],
    //   time: 1646160025789,
    //   version: "2.23.2"
    // }
    //data: (Object.keys(noteData).length !== 0) ?  {} : noteData
    data: noteData
  }

  const settings2 = { 
    tools: { 
      header: {
        class: Header,
        config: {
          placeholder: 'Enter a header',
          levels: [2, 3, 4],
          defaultLevel: 3
        }
      }
    },
  }

  function s (){
    save()
  }
  
  if(edit && currentUser !== undefined)
  {
    var editor = new EditorJS(settings);   
  }
  

  var save = () => {
    editor.save().then((outputData) => {
        console.log('Article data: ', outputData)
        //setData(outputData)
       // if(outputData.blocks.length !== 0) writelist(outputData)
       //writeNote(outputData)
       retreiveNoteID(outputData)
      }).catch((error) => {
        console.log('Saving failed: ', error)
      });
  }
  useEffect(() => {
    let isSubscribed = true;
    
    if(isSubscribed){
      
      editor.load(settings)
      
    }
    return () => (isSubscribed = false)
  }, [noteData]);

  return (
    <div className='note-container'>
      <div className='note-top-panel'>this is note
      <button onClick={s}>save</button>
      </div>
      <div id="editorjs" />
    </div>
  )
}

export default Note