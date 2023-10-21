import React from 'react';
import me from '../images/Sami.jpeg'


export const About = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <img
                style={{
                    height: 200,
                    width: 200,
                    borderRadius: 12
                }}
                src={me}
                onClick={() => console.log('Hello My Name is Sami')}
                alt='picture of me'
            />
            <p>
                testi
            </p>
        </div>
    );
};
