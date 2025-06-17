import React from 'react';

const StudentDashboard = () => {
    const handleVote = async () => {
        try {
            const response = await fetch('/api/vote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ vote: true }), // Adjust the payload as needed
            });

            if (response.ok) {
                alert('Vote submitted successfully!');
            } else {
                alert('Failed to submit vote.');
            }
        } catch (error) {
            console.error('Error submitting vote:', error);
            alert('An error occurred while submitting your vote.');
        }
    };

    return (
        <div>
            <h1>Student Dashboard</h1>
            <button onClick={handleVote}>Submit Vote</button>
        </div>
    );
};

export default StudentDashboard;