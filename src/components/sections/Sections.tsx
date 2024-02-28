import React, { useEffect, useState } from 'react';
import { sections } from '../header/Header';
import { Home } from '../Home';
import { About } from '../about/About';
import { Skills } from '../Skills';
import { Contact } from '../Contact';
import { useInterSectionObserver } from '../../hooks/hooks';
import { SectionRefs } from '../../hooks/types';
import { useTranslation } from 'react-i18next';

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
            className={'section'}
        >
            <h1 className={'section-title'}>{t(section.id)}</h1>
            <div className={'section-content'}>
                {children}
            </div>
        </div>
    );
};

export const Sections = ({ sectionRefs }: {sectionRefs: Props['sectionRefs']}) => {
    const [data, setData] = useState<Element[]>([]);
    useEffect(() => {
        const queryData = document.querySelectorAll('.section-title');
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