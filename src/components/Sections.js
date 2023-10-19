import React from 'react';
import { sections } from './Header';


export const Sections = ({sectionRefs}) => {
    return (
        <>
            {
                sections.map((section) => {
                return (
                    <div
                    key={section.id}
                    ref={sectionRefs[section.id]}
                    style={{
                        height:1000,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        backgroundColor: section.backgroundColor
                    }}>
                    <header>{section.title}</header>
                    </div>
                )
                })
            }
        </>
    )
}