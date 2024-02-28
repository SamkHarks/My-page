import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from '../../i18n';
import styles from './LanguageSelector.module.css';

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: Languages) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className={styles.button_container}>
            <button
                className={`${styles.small_button} hover-color-effect`}
                type="button"
                onClick={() => changeLanguage('fi')}
            >
                fi
            </button>
            <button
                className={`${styles.small_button} hover-color-effect`}
                type="button"
                onClick={() => changeLanguage('en')}
            >
                en
            </button>
        </div>
    );
};

export { LanguageSelector };