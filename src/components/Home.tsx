
import React from 'react';

export const Home = () => {
    return (
        <div style={{
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <h1 style={{ fontSize: 60 }}>Sami Härkönen</h1>
            <h2 style={{ marginTop: 10, marginBottom: 10 }}>Developer at Veikkaus</h2>
            <p style={{ color: 'gray' }}>Passionate About Problem Solving and Building High-Performance Applications for Mobile and Web.</p>
        </div>
    );
};