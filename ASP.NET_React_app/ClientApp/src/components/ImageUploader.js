import React from "react";
import Form from 'react-bootstrap/Form';

const ImageUploader = ({ byteImageAction }) => {
    const handlerFileChange = (event) => {

        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const fileContentString = URL.createObjectURL(file);
                const byteArray = new Uint8Array(e.target.result);
                console.log(fileContentString, byteArray);
                byteImageAction(fileContentString, byteArray);
            };

            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <div>
            <Form.Control type="file" accept="image/*" onChange={handlerFileChange}></Form.Control>
        </div>
    );
};

export default ImageUploader;