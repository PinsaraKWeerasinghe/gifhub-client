import React from "react";
import axios from "axios";
import { getUser, resetUserSession } from "./services/AuthService";

const uploadUrl = 'https://kbtgqlyyz7.execute-api.us-east-2.amazonaws.com/user/upload?user='

function handleFile(files) {

    const user = getUser();
    
    alert("Ready to upload: " + files[0]);

    console.log('Upload started!');

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    const formData = new FormData();
    formData.append('file',files[0])

    axios.post(uploadUrl+user.username, formData,config).then(response => {
        // setUserSession(response.data.user,response.data.token);
        console.log('successfully uploaded!');
        alert("successfully uploaded!");
 
    }).catch(error => {
        console.log('error: ', error);
        // console.log('status: ',error.response.status);
        if (error.response.status === 401 || error.response.status === 403) {
            console.log(error.response.data.message);
            return;
        } else {
            console.log('Back end server is down! Please try again later');
            return;
        }
    })

}


// drag drop file component
const DragDropFile = () => {
    // drag state
    const [dragActive, setDragActive] = React.useState(false);
    const [message, setMessage] = React.useState('No files dropped...');
    // ref
    const inputRef = React.useRef(null);

    // handle drag events
    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files);
            setMessage(e.dataTransfer.files[0],' dropped...');
        }
    };

    // triggers when file is selected with click
    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files);
            setMessage(e.dataTransfer.files[0],' selected...');
        }
    };

    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };

    return /*#__PURE__*/(
        React.createElement("form", { id: "form-file-upload", onDragEnter: handleDrag, onSubmit: e => e.preventDefault() }, /*#__PURE__*/
            React.createElement("input", { ref: inputRef, type: "file", id: "input-file-upload", multiple: true, onChange: handleChange }), /*#__PURE__*/
            React.createElement("label", { id: "label-file-upload", htmlFor: "input-file-upload", className: dragActive ? "drag-active" : "" }, /*#__PURE__*/
                React.createElement("div", null, /*#__PURE__*/
                
                    React.createElement("p", null, "Drag and drop your file here"), /*#__PURE__*/
                    React.createElement("p", null, message), /*#__PURE__*/
                    React.createElement("button", { className: "upload-button", onClick: onButtonClick }, "Upload a file"))),
            dragActive && /*#__PURE__*/React.createElement("div", { id: "drag-file-element", onDragEnter: handleDrag, onDragLeave: handleDrag, onDragOver: handleDrag, onDrop: handleDrop })));


};

export default DragDropFile;