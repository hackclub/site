import React, { useEffect } from 'react';

const Test = () => {
    

    const submitVote = async (rank1, rank2, rank3) => {
        const authToken = window.localStorage.getItem('arcade.authToken');

        try {
            const response = await fetch('/api/arcade/showcase/vote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authToken,
                },
                body: JSON.stringify({
                    rank1,
                    rank2,
                    rank3,
                }),
            })

          
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error submitting vote:', error);
            throw error;
        }
    };

    useEffect(() => {

    const rank1 = ["recnSpjM91mCKJjlo", "recnSpjM91mCKJjlo", "recnSpjM91mCKJjlo", "recnSpjM91mCKJjlo", "recnSpjM91mCKJjlo"];
    const rank2 = ["recnSpjM91mCKJjlo", "recnSpjM91mCKJjlo", "recnSpjM91mCKJjlo", "recnSpjM91mCKJjlo", "recnSpjM91mCKJjlo"];
    const rank3 = ["recnSpjM91mCKJjlo", "recnSpjM91mCKJjlo", "recnSpjM91mCKJjlo", "recnSpjM91mCKJjlo", "recnSpjM91mCKJjlo"];

        submitVote(rank1, rank2, rank3);
    }, []);

    return (
        <div>test</div>
    );
};

export default Test;
