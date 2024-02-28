import React from 'react';
import me from '../images/Sami.jpeg';
import { useTranslation } from 'react-i18next';


export const About = () => {
    const { t } = useTranslation('about');
    return (
        <div
            style={{
                //alignItems: 'center',
                minHeight: 200,
                alignItems: 'flex-start'
            }}
        >
            <img
                className='profile-image'
                src={me}
                alt='picture of me'
            />
            <p style={{ color: 'white', textAlign: 'justify',  }}>
                {t('introduction')}
            </p>
            <p style={{ color: 'white', textAlign: 'justify', marginTop: 20 }}>
                {t('main')}
            </p>
        </div>
    );
};
/*
{
    border-radius: 50%; /* To ensure the image is round
    width: 100px; /* Adjust as necessary
    height: 100px; /* Adjust as necessary
    float: left;
    shape-outside: circle(50%); /* Makes the text wrap around the image
    margin-right: 10px; /* Adjust spacing between image and text
  }
*/