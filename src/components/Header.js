import React, { useState } from 'react';
import '../App.css';
import { useScroll } from '../hooks/hooks';

export const sections = [
    { id: 'welcome', title: 'Welcome', backgroundColor: '#282c34' },
    { id: 'about', title: 'About Me', backgroundColor: 'red' },
    { id: 'portfolio', title: 'Portfolio', backgroundColor: 'green' },
    { id: 'contact', title: 'Contact', backgroundColor: 'blue' },
];

export const Header = ({ sectionRefs }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isScrolledUp = useScroll();

    const onClick = () => {
        setIsOpen(!isOpen);
    };
    const scrollToSection = (sectionId) => {
        const section = sectionRefs[sectionId];
        if (section) {
            onClick();
            section.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <div className={`Sticky-header ${isScrolledUp || isOpen ? 'visible' : 'hidden'} ${isOpen && 'open'}`}>
            <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
            }}>
                <button onClick={onClick}>
                    {isOpen ? 'Close Menu' : 'Open Menu'}
                </button>
            </div>
            {isOpen &&
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}>
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
                                )
                            })
                        }
                    </ol>
                </div>
            }
        </div>
    );
};

