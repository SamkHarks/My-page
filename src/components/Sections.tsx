import React, { useEffect, useState } from 'react';
import { sections } from './Header';
import { About } from './About';
import { Welcome } from './Welcome';
import { Portfolio } from './Portfolio';
import { Contact } from './Contact';
import '../App.css';
import { useInterSectionObserver } from '../hooks/hooks';
import { SectionRefs } from '../hooks/types';

const components: Record<string,React.ComponentType> = {
    welcome: Welcome,
    about: About,
    portfolio: Portfolio,
    contact: Contact
};

type Props = {
    section: typeof sections[number],
    sectionRefs: SectionRefs,
    children: React.ReactNode;
}

const SectionWrapper = ({
    section,
    sectionRefs,
    children
}: Props) => (
    <div
        ref={sectionRefs[section.id]}
        className={'section'}
        style={{ backgroundColor: section.backgroundColor }}
    >
        <header className={'section-title'}>{section.title}</header>
        <div style={{
            paddingTop: 20
        }}>
            {children}
        </div>
    </div>
);

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