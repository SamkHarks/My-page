import React, { useState } from 'react';
import '../App.css';
import { useScroll, useUserScroll } from '../hooks/hooks';
import { SelectLanguage } from './SelectLanguage';
import { useTranslation } from 'react-i18next';

export const sections = [
    { id: 'welcome', title: 'Welcome', backgroundColor: '#282c34' },
    { id: 'about', title: 'About Me', backgroundColor: 'red' },
    { id: 'portfolio', title: 'Portfolio', backgroundColor: 'green' },
    { id: 'contact', title: 'Contact', backgroundColor: 'blue' },
];

export const Header = ({ sectionRefs }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isUserScroll, setIsUserScroll] = useUserScroll();
    const onClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <HeaderToggle
                onClick={onClick}
                isOpen={isOpen}
                isUserScroll={isUserScroll}
            />
            <HeaderSections
                onClick={onClick}
                sectionRefs={sectionRefs}
                isOpen={isOpen}
                setIsUserScroll={setIsUserScroll}
            />
        </>
    );
};

const HeaderToggle = ({
    isOpen,
    onClick,
    isUserScroll
}) => {
    const isScrolledUp = useScroll(isUserScroll);
    return (
        <div className={`Sticky-header ${(isScrolledUp && isUserScroll) || isOpen ? 'visible' : 'hidden'}`}>
            <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
            }}>
                <SelectLanguage />
                <button onClick={onClick}>
                    {isOpen ? 'Close Menu' : 'Open Menu'}
                </button>
            </div>
        </div>
    );
};

const HeaderSections = ({
    onClick,
    sectionRefs,
    isOpen,
    setIsUserScroll
}) => {
    const { t } = useTranslation();
    const scrollToSection = (sectionId) => {
        const section = sectionRefs[sectionId];
        if (section) {
            onClick();
            setIsUserScroll(false);
            section.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <div className={`header-sections ${isOpen ? 'open' : 'closed'}`}>
            <ol>
                {
                    sections.map((section) => {
                        return (
                            <li
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                            >
                                {t(section.id)}
                            </li>
                        );
                    })
                }
            </ol>
        </div>
    );
};

