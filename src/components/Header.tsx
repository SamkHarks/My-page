import React, { useState } from 'react';
import { useScroll } from '../hooks/hooks';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from './LanguageSelector';
import { SectionRefs } from '../hooks/types';
import { RectangleProgress } from './RectangleProgress';

export const sections = [
    { id: 'welcome', title: 'Welcome', backgroundColor: '#282c34' },
    { id: 'about', title: 'About Me', backgroundColor: '#282c34' },
    { id: 'portfolio', title: 'Portfolio', backgroundColor: '#282c34' },
    { id: 'contact', title: 'Contact', backgroundColor: '#282c34' },
];
type HeaderProps = {
    sectionRefs: SectionRefs
}
export const Header = ({ sectionRefs }: HeaderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClick = () => {
        setIsOpen(!isOpen);
    };
    return (
        <header>
            <HeaderToggle
                onClick={onClick}
                isOpen={isOpen}
            />
            <HeaderSections
                onClick={onClick}
                sectionRefs={sectionRefs}
                isOpen={isOpen}
            />
        </header>
    );
};

type HeaderToggleProps = {
    isOpen: boolean,
    onClick: () => void,
}

const HeaderToggle = ({
    isOpen,
    onClick,
}: HeaderToggleProps) => {
    const scrollProgress = useScroll();
    return (
        <div
            className={'sticky-header'}
        >
            <div style={{ display: 'flex', columnGap: 4, alignItems: 'center', padding: 10 }}>
                <RectangleProgress progress={scrollProgress} text={"S.H"} size={60} />
                <LanguageSelector />
            </div>
            <div style={{ display: 'flex', columnGap: 4, paddingTop: 20, paddingRight: 10, alignItems: 'center' }}>
                <button className={'header-button hover-color-effect'} onClick={onClick}>
                    {isOpen ? 'Close Menu' : 'Open Menu'}
                </button>
            </div>
        </div>
    );
};

type HeaderSectionProps = HeaderProps & HeaderToggleProps;

const HeaderSections = ({
    onClick,
    sectionRefs,
    isOpen,
}: HeaderSectionProps) => {
    const { t } = useTranslation('sections');
    const scrollToSection = (sectionId: string) => {
        const section = sectionRefs[sectionId];
        if (section.current) {
            onClick();
            section.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <div className={`header-sections ${isOpen ? 'open' : 'closed'}`}>
            <ol className="custom-colors" style={{display: 'flex', flexDirection: 'column' }}>
                {
                    sections.map((section) => {
                        return (
                            <li
                                key={section.id}
                                className={'li-item'}
                                onClick={() => scrollToSection(section.id)}>
                                {t(section.id)}
                            </li>
                        );
                    })
                }
            </ol>
        </div>
    );
};

