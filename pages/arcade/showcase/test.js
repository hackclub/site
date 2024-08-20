import React from 'react'
import { useEffect } from 'react';

const test = () => {

    async function submitVote(points, projectId) {
        const authToken = window.localStorage.getItem('arcade.authToken')

        try {
            const response = await fetch('/api/arcade/showcase/vote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authToken,
                    'Points': points.toString(),
                    'Project-ID': projectId
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error submitting vote:', error);
            throw error;
        }
    }
    
    useEffect(() => {
        submitVote(5, "recnSpjM91mCKJjlo");
    }, []);
    
return (
    <div>test</div>
  )
}

export default test