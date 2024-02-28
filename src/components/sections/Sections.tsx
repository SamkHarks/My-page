import React, { useEffect, useState } from 'react';
import { sections } from '../header/Header';
import { Home } from './home/Home';
import { About } from './about/About';
import { Skills } from './skills/Skills';
import { Contact } from './contact/Contact';
import { useInterSectionObserver } from '../../hooks/hooks';
import { SectionRefs } from '../../hooks/types';
import { useTranslation } from 'react-i18next';
import styles from './Sections.module.css';

const components: Record<string,React.ComponentType> = {
    home: Home,
    about: About,
    skills: Skills,
    contact: Contact
};

type Props = {
    section: typeof sections[number];
    sectionRefs: SectionRefs;
    children: React.ReactNode;
}

const SectionWrapper = ({
    section,
    sectionRefs,
    children,
}: Props) => {
    const { t } = useTranslation('sections');
    return (
        <div
            ref={sectionRefs[section.id]}
            className={styles.section}
        >
            <h1 className={'section_title'}>{t(section.id)}</h1>
            <div className={styles.section_content}>
                {children}
            </div>
        </div>
    );
};

export const Sections = ({ sectionRefs }: {sectionRefs: Props['sectionRefs']}) => {
    const [data, setData] = useState<Element[]>([]);
    useEffect(() => {
        const queryData = document.querySelectorAll(`.section_title`);
        setData([...queryData]);
    }, []);
    useInterSectionObserver(data);
    return (
        <>
            {
                sections.map((section) => {
                    const SectionComponent = components[section.id];
                    return (
                        <SectionWrapper
                            key={section.id}
                            section={section}
                            sectionRefs={sectionRefs}
                        >
                            <SectionComponent />
                        </SectionWrapper>
                    );
                })
            }
        </>
    );
};