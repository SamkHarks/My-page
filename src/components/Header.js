import React, { useState } from 'react';
import '../App.css';
import { useScroll } from '../hooks/hooks';
import { SelectLanguage } from './SelectLanguage';

export const sections = [
    { id: 'welcome', title: 'Welcome', backgroundColor: '#282c34' },
    { id: 'about', title: 'About Me', backgroundColor: 'red' },
    { id: 'portfolio', title: 'Portfolio', backgroundColor: 'green' },
    { id: 'contact', title: 'Contact', backgroundColor: 'blue' },
];

export const Header = ({ sectionRefs }) => {
    const [isOpen, setIsOpen] = useState(false);

    const onClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <HeaderToggle
                onClick={onClick}
                isOpen={isOpen}
            />
            <HeaderSections
                onClick={onClick}
                sectionRefs={sectionRefs}
                isOpen={isOpen}
            />
        </>
    );
};

const HeaderToggle = ({
    isOpen,
    onClick
}) => {
    const isScrolledUp = useScroll();
    return (
        <div className={`Sticky-header ${isScrolledUp || isOpen ? 'visible' : 'hidden'}`}>
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
    isOpen
}) => {

    const scrollToSection = (sectionId) => {
        const section = sectionRefs[sectionId];
        if (section) {
            onClick();
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
                                {section.title}
                            </li>
                        );
                    })
                }
            </ol>
        </div>
    );
};

