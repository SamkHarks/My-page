import React from 'react';


export const Welcome = () => {
    return (
        <div style={{
            color: 'white',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <h1 style={{fontSize: 60}}>Sami Härkönen</h1>
            <h2>Developer at Veikkaus</h2>
            <p>Hi, my name is Sami, and I build things for web and mobile apps.</p>
        </div>
    );
};