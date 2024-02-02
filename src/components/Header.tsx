import React, { useState } from 'react';
import '../App.css';
import { useScroll, useUserScroll } from '../hooks/hooks';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from './LanguageSelector';
import { SectionRefs } from '../hooks/types';

export const sections = [
    { id: 'welcome', title: 'Welcome', backgroundColor: '#282c34' },
    { id: 'about', title: 'About Me', backgroundColor: 'red' },
    { id: 'portfolio', title: 'Portfolio', backgroundColor: 'green' },
    { id: 'contact', title: 'Contact', backgroundColor: 'blue' },
];
type HeaderProps = {
    sectionRefs: SectionRefs
}
export const Header = ({ sectionRefs }: HeaderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isUserScroll, setIsUserScroll] = useUserScroll();
    const onClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header>
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
        </header>
    );
};

type HeaderToggleProps = {
    isOpen: boolean,
    onClick: () => void,
    isUserScroll: boolean
}

const HeaderToggle = ({
    isOpen,
    onClick,
    isUserScroll
}: HeaderToggleProps) => {
    const isScrolledUp = useScroll(isUserScroll);
    return (
        <div
            className={`sticky-header ${(isScrolledUp && isUserScroll) || isOpen ? 'visible' : 'hidden'}`}
        >
            <LanguageSelector />
            <button className={'header-button hover-color-effect'} onClick={onClick}>
                {isOpen ? 'Close Menu' : 'Open Menu'}
            </button>
        </div>
    );
};

type HeaderSectionProps =
    HeaderProps & Omit<HeaderToggleProps, 'isUserScroll'> & {
        setIsUserScroll: (value: boolean) => void
    };

const HeaderSections = ({
    onClick,
    sectionRefs,
    isOpen,
    setIsUserScroll
}: HeaderSectionProps) => {
    const { t } = useTranslation();
    const scrollToSection = (sectionId: string) => {
        const section = sectionRefs[sectionId];
        if (section.current) {
            onClick();
            setIsUserScroll(false);
            section.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <div className={`header-sections ${isOpen ? 'open' : 'closed'}`}>
            <ul className={'no-bullets'}>
                {
                    sections.map((section) => {
                        return (
                            <li
                                key={section.id}
                                className={'li-item'}
                                onClick={() => scrollToSection(section.id)}
                            >
                                {t(section.id)}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

