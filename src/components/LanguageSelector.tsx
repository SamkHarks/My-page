import React from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css';
import { Languages } from '../i18n';

const LanguageSelector = () => {
    const { i18n } = useTranslation('translation');

    const changeLanguage = (lng: Languages) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div style={{ marginTop: -2, display: 'flex', gap: 2 }}>
            <button
                className={'small-button hover-color-effect'}
                type="button"
                onClick={() => changeLanguage('fi')}
            >
                fi
            </button>
            <button
                className={'small-button hover-color-effect'}
                type="button"
                onClick={() => changeLanguage('en')}
            >
                en
            </button>
        </div>
    );
};

export { LanguageSelector };