import '../App.css';
import React from 'react';
import { useRefs } from '../hooks/hooks';
import { Header } from './Header';
import { Sections } from './Sections';

export const Home = () => {
    const sectionRefs = useRefs();
    return (
        <div className="App">
            <Header sectionRefs={sectionRefs} />
            <Sections sectionRefs={sectionRefs} />
        </div>
    );
}