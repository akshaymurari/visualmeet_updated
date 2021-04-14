import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Add from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./NewLink.scss";
import { Button } from '@material-ui/core';
import transitions from '@material-ui/core/styles/transitions';

class NewLink extends Component {
  state = {
    count: 1,
    titleState: EditorState.createEmpty(),
    descState: EditorState.createEmpty(),
    title: true,
    desc: true
  }

  onTitleStateChange: Function = (titleState) => {
    this.setState({
      titleState,
    });
  };
  onDescStateChange: Function = (descState) => {
    this.setState({
      descState,
    });
  };
  onsectionStateChange: Function = (sectionState) => {
    this.setState({
      sectionState,
    });
  }
  oneditorStateChange: Function =(editorState) => {
    this.setState({
      editorState,
    });
  }
  addClassLink: Function = () => {
    const newLink = {
      title: draftToHtml(convertToRaw(this.state.titleState.getCurrentContent())),
      content: draftToHtml(convertToRaw(this.state.descState.getCurrentContent())),
      section: draftToHtml(convertToRaw(this.state.sectionState.getCurrentContent())),
      date: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
    }
    console.log(newLink);
    this.props.addLink(newLink)
  }

  render() {
    return (
      <div className="newLink ml-auto" style={{
        display: this.props.show ? "inline-block": "none",
      }}>
          <div className="newLinkCard" style={{
            transform: this.props.show ? "translateY(0vh)":"translateY(100vh)",
            border: "2px black solid",
            marginTop: "0px !important"
          }}>
          <Editor
            style={{border: "2px red solid",
            transform: this.props.show ? "translateY(0vh)":"translateY(100vh)"}}
            editorState={this.state.titleState}
            wrapperClassName="newWrapper"
            toolbarClassName="newToolBar"
            editorClassName="newEditor1"
            onEditorStateChange={this.onTitleStateChange}
            toolbar={
              {
                fontSize: {
                  options: [16, 18, 24, 30],
                  defaultSize:14
                }
              }
            }
            /*toolbarHidden={this.state.title}
            onFocus = {() => {
              if(this.state.count===1){
                this.setState(prevState => {
                  return {count: prevState.count + 1}
                });
                this.setState({
                  title: !this.state.title,
                  desc: this.state.desc,
                });
              }
              else{
                this.setState({
                  title: !this.state.title,
                  desc: !this.state.desc,
                });
              }
            }} */
            placeholder="Title"
            />
          <Editor
            style={{border: "2px red solid",
            transform: this.props.show ? "translateY(10%)":"none", transition: "all 1.3s ease"}}
            editorState={this.state.descState}
            wrapperClassName="newWrapper"
            editorClassName="newEditor2"
            toolbarClassName="newToolBar"
            onEditorStateChange={this.onDescStateChange}
            /* toolbarHidden={this.state.desc}
            onFocus = {() => {
              if(this.state.count===1){
                this.setState(prevState => {
                  return {count: prevState.count + 1}
                });
                this.setState({
                  title: this.state.title,
                  desc: !this.state.desc,
                });
              }
              else{
                this.setState({
                  title: !this.state.title,
                  desc: !this.state.desc,
                });
              }
            }} */
            toolbar={
              {
                fontSize: {
                  options: [8, 9, 10, 11, 12, 14, 16, 18],
                  defaultSize: 14,
                }
              }
            }
            placeholder="Description"
            required
          />
          <Editor
            style={{border: "2px red solid",
            transform: this.props.show ? "translateY(10%)":"none", transition: "all 1.3s ease"}}
            editorState={this.state.sectionState}
            wrapperClassName="newWrapper"
            editorClassName="newEditor2"
            toolbarClassName="newToolBar"
            onEditorStateChange={this.onsectionStateChange}
            toolbar={
              {
                fontSize: {
                  options: [8, 9, 10, 11, 12, 14, 16, 18],
                  defaultSize: 14,
                }
              }
            }
            placeholder="section"
            required
          />
          <Editor
            style={{border: "2px red solid",
            transform: this.props.show ? "translateY(10%)":"none", transition: "all 1.3s ease"}}
            editorState={this.state.editorState}
            wrapperClassName="newWrapper"
            editorClassName="newEditor2"
            toolbarClassName="newToolBar"
            onEditorStateChange={this.oneditorStateChange}
            toolbar={
              {
                fontSize: {
                  options: [8, 9, 10, 11, 12, 14, 16, 18],
                  defaultSize: 14,
                }
              }
            }
            placeholder="date(YYYY:MM:DD HH-MM-SS in this format)"
            required
          />
          <div style={{backgroundColor: "#00af91",
        transform: this.props.show ? "translateY(0vh)":"translateY(100vh)", trasition: "all 1.3s ease"}} className="newLinkAddButton">

            <Button variant="contained" style={{border: "none",
            outline:"none", margin:"1rem"}} className="mt-3 ml-auto newLinkAddButtons" type="submit" 
            onClick={
              ()=>{
                /* this.props.addLink(draftToHtml(convertToRaw(this.state.titleState.getCurrentContent())));
                this.props.addLink(draftToHtml(convertToRaw(this.state.descState.getCurrentContent())));
                */
                this.addClassLink();
                this.props.close();
                this.onTitleStateChange(EditorState.createEmpty());
                this.props.close();
                this.onDescStateChange(EditorState.createEmpty());
              }
            }>
            Add
            </Button>

            <Button variant="contained" style={{border: "none",
                    outline:"none", margin:"1rem", margin:"auto"}} className="newLinkAddButtons" onClick={this.props.close}>Close</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewLink;