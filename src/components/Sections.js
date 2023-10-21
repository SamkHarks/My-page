import React from 'react';
import { sections } from './Header';
import { About } from '../components/About';
import { Welcome } from './Welcome';
import { Portfolio } from './Portfolio';
import { Contact } from './Contact';
/*
{ id: 'welcome', title: 'Welcome', backgroundColor: "#282c34" },
    { id: 'about', title: 'About Me', backgroundColor: 'red' },
    { id: 'portfolio', title: 'Portfolio', backgroundColor: 'green' },
    { id: 'contact', title: 'Contact', backgroundColor: 'blue' },
  ];
*/
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
        style={{
            height:1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingLeft: 20,
            paddingRight: 20,
            backgroundColor: section.backgroundColor
        }}>
        <header>{section.title}</header>
        <div style={{
            paddingTop: 20
        }}>
            {children}
        </div>
    </div>
);

export const Sections = ({ sectionRefs }) => {
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