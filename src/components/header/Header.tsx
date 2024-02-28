import React, { useState } from 'react';
import { useScroll } from '../../hooks/hooks';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../languageSelector/LanguageSelector';
import { SectionRefs } from '../../hooks/types';
import { RectangleProgress } from '../rectangleProgress/RectangleProgress';
import styles from './Header.module.css';

export const sections = [
    { id: 'home', title: 'Welcome', backgroundColor: '#282c34' },
    { id: 'about', title: 'About Me', backgroundColor: '#282c34' },
    { id: 'skills', title: 'My Skills', backgroundColor: '#282c34' },
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
            className={styles.sticky_header}
        >
            <div className={styles.container_left}>
                <RectangleProgress progress={scrollProgress} text={"S.H"} size={60} />
                <LanguageSelector />
            </div>
            <div className={styles.container_right}>
                <button className={`${styles.header_button} hover-color-effect`} onClick={onClick}>
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
        <div className={`${styles.header_sections} ${isOpen ? styles.open : styles.closed}`}>
            <ol className={styles.custom_colors}>
                {
                    sections.map((section) => {
                        return (
                            <li
                                key={section.id}
                                className={styles.li_item}
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

