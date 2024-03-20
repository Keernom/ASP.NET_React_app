import React from "react";

const ImageComponent = ({ base64String, styles }) => {
    if (base64String === null) {
        return;
    }

    const imageUrl = `data:image/jpeg;base64,${base64String}`;

    return <img className={styles} src={imageUrl} alt="Image" />
}

export default ImageComponent;