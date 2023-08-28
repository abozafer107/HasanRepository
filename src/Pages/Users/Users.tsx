import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        try {
            // Fetch user data from the API
            axios.get('https://localhost:5001/api/Users')
                .then(response => {
                    setUsers(response.data);
                })
                .catch(error => {
                    console.error('Error fetching users:', error);
                });
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }, []);
    
    
    const handleDelete = async (id) => {

        fetch('https://localhost:5001/api/Users', {
            method: 'DELETE',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": id
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('Delete request successful');
            } else {
                console.error('Delete request failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

        try {
            // Remove the deleted user from the list
            setUsers(users => users.filter(user => user.id !== id));
            } catch (error) {
            console.error('Error deleting user:', error);
            }
        };

    return (
        <div className="user-list-container">
            <ul type='none'>
                {users.map(user => (
                    <li key={user.id} className="user-item">
                        <button
                            className="delete-button"
                            onClick={() => handleDelete(user.id)}
                        >
                            x
                        </button>
                        
                        <p className="user-info">Name: {user.username}</p>
                        <p className="user-info">Email: {user.email}</p>
                        <p className="user-info">ID: {user.id}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Users;