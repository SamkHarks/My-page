import React from 'react';
import me from '../images/Sami.jpeg';
import { useTranslation } from 'react-i18next';


export const About = () => {
    const { t } = useTranslation('about');
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
                {t('description')}
            </p>

        </div>
    );
};
