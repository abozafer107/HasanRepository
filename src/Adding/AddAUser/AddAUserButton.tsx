// App.js
import React, { useState } from 'react';
import AddAUser from './AddAUser';

function AddAUserButton() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className="App">
            <button onClick={openPopup}>New User</button>

            {isPopupOpen && <AddAUser />}

            {isPopupOpen && (
                <div className="overlay" onClick={closePopup}></div>
            )}
        </div>
    );
}

export default AddAUserButton;
