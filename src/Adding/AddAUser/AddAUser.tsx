import React, { useState } from 'react';
import axios from 'axios';

function AddAUser() {
    const source = 'https://localhost:5001/';
    const [isOpen, setIsOpen] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    const toggleVisibility = () => {
        setIsOpen(!isOpen);
    };

    function navigateTo(url) {
        window.location.href = url;
    }

    const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        axios.post(source + 'api/Users', formData)
        .then(response => {
            console.log('POST response:', response.data);
            toggleVisibility();
            navigateTo('http://localhost:5173/users');
        })
        .catch(error => {
        console.error('Error making POST request:', error);
        });
        
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h2>New User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name" required
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"required
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddAUser