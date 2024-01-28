import React from 'react';
import { useTranslation } from 'react-i18next';


const SelectLanguage = () => {
    const { i18n } = useTranslation('translation');

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div style={{ marginTop: -2 }}>
            <button type="button" onClick={() => changeLanguage('fi')}>
                fi
            </button>
            <button type="button" onClick={() => changeLanguage('en')}>
                en
            </button>
        </div>
    );
};

export { SelectLanguage };