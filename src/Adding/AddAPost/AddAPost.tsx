import React, { useState } from "react";
import axios from "axios";

function AddAPost() {
    const [isOpen, setIsOpen] = useState(true);
    const [tagNames, setTagNames] = useState([]);
    const [tagIds, setTagIds] = useState([]);
    const [tagName, setTagName] = useState('');
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        userId: 0,
        tagIds: []
    });

    const toggleVisibility = () => {
        setIsOpen(!isOpen);
    };

    function navigateTo(url) {
        window.location.href = url;
    }

    const handleTextInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUserInputChange = (event) => {
        const { name, value } = event.target;
        findUserIdByName(value)
        .then(userId => {
            setFormData((prevData) => ({
                ...prevData,
                [name]: userId,
            }));
        })
        .catch(error => {
            console.error('Error fetching :', error);
        });
    };

    const handleTagInputChange = (event) => {
        setTagName(event.target.value);
    }

    function findUserIdByName(userToFind) {
        const API_URL = 'https://localhost:5001/api/Users';
        
        return axios.get(API_URL, { params: { username: userToFind } })
            .then(response => {
                const users = response.data;
                const foundUser = users.find(user => user.username === userToFind);
                if (foundUser) {
                    console.log(`User ID for ${userToFind}: ${foundUser.id}`);
                    return foundUser.id;
                } else {
                    console.log(`User ${userToFind} was not found.`);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    function findTagIdByName(tagToFind) {
        const API_URL = 'https://localhost:5001/api/Tags';
        
        return axios.get(API_URL, { params: { name: tagToFind } })
            .then(response => {
                const tags = response.data;
                const foundTag = tags.find(tag => tag.name === tagToFind);
                if (foundTag) {
                    console.log(`Tag ID for ${tagToFind}: ${foundTag.id}`);
                    return foundTag.id;
                } else {
                    console.log(`Tag ${tagToFind} was not found.`);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    const handleTagAdd = () => {
        if (tagName.trim() !== "") {
            axios.post('https://localhost:5001/api/Tags', { name: tagName })
                .then(response => {
                    const newTagId = response.data.data.id;
                    setTagIds([...tagIds, newTagId]);
                    setTagNames([...tagNames, tagName]);
                    setTagName('');
                    setFormData((prevData) => ({
                        ...prevData,
                        tagIds: [...prevData.tagIds, newTagId],
                    }));
                    console.log('POST response:', response.data);
                    console.log('Updated tagIds:', tagIds);
                    console.log('Updated formData:', formData);
                })
                .catch(error => {
                    console.error('Error making POST request:', error);
                });
        }
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('Form Data before submission:', formData);
    
        axios.post('https://localhost:5001/api/Posts', formData)
            .then(response => {
                console.log('POST response:', response.data.data);
                toggleVisibility();
                navigateTo('http://localhost:5173/posts');
                console.log('Form Data after submission:', formData);
            })
            .catch(error => {
                console.error('Error making POST request:', error);
            });
    };
    
    const handleTagRemove = (tagToRemove) => {
        const updatedTagNames = tagNames.filter(tag => tag !== tagToRemove);
        setTagNames(updatedTagNames);

        const updatedTagIds = tagIds.filter(id => id !== findTagIdByName(tagToRemove));
        setTagIds(updatedTagIds);

        setFormData((prevData) => ({
            ...prevData,
            tagIds: updatedTagIds,
        }));
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h2>New Post</h2>
                <form onSubmit={handleSubmit}>
                    <div className="tag-container">
                        {tagNames.map((tag, index) => (
                            <div key={index} className="tag">
                                {tag}
                                <button
                                    className="remove-button"
                                    onClick={() => handleTagRemove(tag)}
                                >
                                    x
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="form-group">
                        <label htmlFor="tagIds">Tags:</label>
                        <input
                            type="text"
                            placeholder="Enter a tag"
                            value={tagName}
                            onChange={handleTagInputChange}
                        />
                        <button
                            type="button"
                            onClick={handleTagAdd}
                            className="add-a-tag-button"
                        >
                            Add Tag
                        </button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" name="title" required onChange={handleTextInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <input type="text" id="description" name="description" required onChange={handleTextInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="userId">User:</label>
                        <input type="text" id="userId" name="userId" required onChange={handleUserInputChange} />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddAPost;
