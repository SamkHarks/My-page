import '../App.css';
import React from 'react';
import { useRefs } from '../hooks/hooks';
import { Sections } from './Sections';
import { Header } from './Header';

export const Home = () => {
    const sectionRefs = useRefs();
    return (
        <div className="App">
            <Header sectionRefs={sectionRefs} />
            <div style={{
                height: 200,
                backgroundColor: 'whitesmoke'
            }}>
            </div>
            <Sections sectionRefs={sectionRefs} />
        </div>
    );
};