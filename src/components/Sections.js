import React, { useEffect, useState } from 'react';
import { sections } from './Header';
import { About } from '../components/About';
import { Welcome } from './Welcome';
import { Portfolio } from './Portfolio';
import { Contact } from './Contact';
import '../App.css';
import { useInterSectionObserver } from '../hooks/hooks';

const components = {
    welcome: Welcome,
    about: About,
    portfolio: Portfolio,
    contact: Contact
};

const SectionWrapper = ({
    section,
    sectionRefs,
    children
}) => (
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

export const Sections = ({ sectionRefs }) => {
    const [data, setData] = useState([]);
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