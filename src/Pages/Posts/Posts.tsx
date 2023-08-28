import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        try {
            // Fetch post data from the API
            axios.get('https://localhost:5001/api/Posts')
                .then(response => {
                    setPosts(response.data);
                })
                .catch(error => {
                    console.error('Error fetching posts:', error);
                });
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }, []);
    
    
    const handleDelete = async (id) => {

        fetch('https://localhost:5001/api/Posts', {
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
            setPosts(posts => posts.filter(post => post.id !== id));
            } catch (error) {
            console.error('Error deleting post:', error);
            }
        };

    return (
        <div className="user-list-container">
            <ul type='none'>
                {posts.map(post => (
                    <li key={post.id} className="user-item">
                        <button
                            className="delete-button"
                            onClick={() => handleDelete(post.id)}
                        >
                            x
                        </button>
                        <p className="user-info">Title: {post.title}</p>
                        <p className="user-info">Description: {post.description}</p>
                        <p className="user-info">User ID: {post.user.id}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Posts;