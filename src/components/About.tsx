import React from 'react';
import me from '../images/Sami.jpeg';


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
                alt='picture of me'
            />
            <p>
                {"I have a master's degree in Computer Science and a bachelor's degree in Engineering Physics and Mathematics."}
            </p>

        </div>
    );
};
