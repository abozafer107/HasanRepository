import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Tags() {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        try {
            // Fetch tag data from the API
            axios.get('https://localhost:5001/api/Tags')
                .then(response => {
                    setTags(response.data);
                })
                .catch(error => {
                    console.error('Error fetching tags:', error);
                });
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }, []);
    
    
    const handleDelete = async (id) => {

        fetch('https://localhost:5001/api/Tags', {
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
            // Remove the deleted tag from the list
            setTags(tags => tags.filter(tag => tag.id !== id));
            } catch (error) {
            console.error('Error deleting tag:', error);
            }
        };

    return (
        <div className="tag-container">
                {tags.map((tag, index) => (
                    <div key={index} className="tag">
                    {tag.name}
                    <button
                        className="remove-button"
                        onClick={() => handleDelete(tag.id)}
                    >
                        x
                    </button>
                </div>
                ))}
        </div>
    );
}

export default Tags;