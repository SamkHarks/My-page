import '../App.css';
import React from 'react';
import { useRefs } from '../hooks/hooks';
import { Header } from './Header';
import { Sections } from './Sections';
import { About } from './About';
import { useTranslation } from 'react-i18next';

export const Home = () => {
    const sectionRefs = useRefs();
    const { t, i18n } = useTranslation("translation");

    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };
    return (
        <div className="App">
            <Header sectionRefs={sectionRefs} />
            <div style={{
                height: 200,
                backgroundColor: "whitesmoke"
            }}>
            <button type="button" onClick={() => changeLanguage('fi')}>
                fi
            </button>
            <button type="button" onClick={() => changeLanguage('en')}>
                en
            </button>
                <p>{t('title')}</p>
            </div>
            <Sections sectionRefs={sectionRefs} />
        </div>
    );
}