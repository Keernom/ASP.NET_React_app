import React from "react";

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
            <input type="file" accept="image/*" onChange={handlerFileChange}></input>
        </div>
    );
};

export default ImageUploader;