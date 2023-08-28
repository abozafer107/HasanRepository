// App.js
import React, { useState } from 'react';
import AddAPost from './AddAPost';

function AddAPostButton() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className="App">
            <button onClick={openPopup}>New Post</button>

            {isPopupOpen && <AddAPost />}

            {isPopupOpen && (
                <div className="overlay" onClick={closePopup}></div>
            )}
        </div>
    );
}

export default AddAPostButton;
