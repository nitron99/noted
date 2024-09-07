import React, { useState, useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from  '@editorjs/list';
import Paragraph from 'editorjs-paragraph-with-alignment';
import Quote from '@editorjs/quote';
import Warning from '@editorjs/warning';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import SimpleImage from '@editorjs/simple-image';
import CodeBox from '@bomdi/codebox';

// contexts
import { useDB } from '../../contexts/firebase-db';
import { useAuth } from '../../contexts/AuthContext';

import './styles.css';

const NotePage = () => {
  const { currentUser } = useAuth();
  const { 
    writeNote, 
    noteData, 
    olddata, 
    setOlddata
  } = useDB();
  const [edit, setEdit] = useState(false);


  useEffect(()=>{
    console.log(noteData)
    if(olddata){
      // old page
      if(Object.keys(noteData).length === 0) {
        setEdit(false);
      }else{
        console.log("empty");
        setEdit(true);
      }
      setOlddata(false);
    }else{
      //new page
      setEdit(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteData]);

  // ==================== editor configures ======================
  const settings = { 
    tools: {
      header: {
        class: Header,
        inlineToolbar : true,
        config: {
          placeholder: 'Enter a header',
          levels: [2, 3, 4],
          defaultLevel: 3,
          defaultAlignment: 'left'
        }
      },
      list: {
        class: List,
        inlineToolbar : true
      },
      paragraph: {
        class: Paragraph,
        inlineToolbar: true,
      },
      quote: {
        class: Quote,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+O',
        config: {
          quotePlaceholder: 'Enter a quote',
          captionPlaceholder: 'Quote\'s author',
        },
      },
      image: SimpleImage,
      warning: {
        class: Warning,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+W',
        config: {
          titlePlaceholder: 'Title',
          messagePlaceholder: 'Message',
        },
      },
      delimiter: Delimiter,
      inlineCode: {
        class: InlineCode,
        shortcut: 'CMD+SHIFT+M',
      },
      codeBox: {
        class: CodeBox,
        config: {
          themeURL: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/rainbow.min.css', // Optional
          themeName: 'nord', // Optional
          useDefaultTheme: 'dark' // Optional. This also determines the background color of the language select drop-down
        }
      },
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

  // const settings2 = { 
  //   tools: { 
  //     header: {
  //       class: Header,
  //       config: {
  //         placeholder: 'Enter a header',
  //         levels: [2, 3, 4],
  //         defaultLevel: 3
  //       }
  //     }
  //   },
  // }

  // ------------------- initializing editor ---------------------
  if(edit && currentUser !== undefined){
    var editor = new EditorJS(settings);   
  }
    
  const save = () => {
    editor.save()
      .then((outputData) => {
        console.log('Article data: ', outputData)
        writeNote(outputData);
      }).catch((error) => {
        console.log('Saving failed: ', error)
      });
  }



  return (
    <div className='dashboard-container'>
      <div className='vertical-bar1' />
      <div className='vertical-bar2' />
      <div className='dashboard-topbar'>
        <div className='dashboard-heading'></div>
          <button className='home-navbar-btn' onClick={save}>
            Save
          </button>
      </div>
      <div className='home-divider' />
      <div className='note-container'>
        <div className='note-top-panel'>
        {/* <button onClick={save}>save</button> */}
        </div>
        <div id="editorjs" />
      </div>
    </div>
  )
}

export default NotePage;