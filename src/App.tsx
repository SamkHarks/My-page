import React from 'react';
import './App.css';
import { useRefs } from './hooks/hooks';
import { Header } from './components/header/Header';
import { Sections } from './components/sections/Sections';

const App = () => {
    const sectionRefs = useRefs();
    return (
        <div className="App">
            <Header sectionRefs={sectionRefs} />
            <Sections sectionRefs={sectionRefs} />
        </div>
    );
};


export default App;
