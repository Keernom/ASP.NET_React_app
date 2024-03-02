import { event } from "jquery";
import React from "react";

const ImageUploader = ({ byteImageAction }) => {
    const handlerFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const byteArray = new Uint8Array(e.target.result);
                byteImageAction(byteArray);
            };

            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handlerFileChange}></input>
        </div>
    );
};

export default ImageUploader;