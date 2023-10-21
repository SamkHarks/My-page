import React, { forwardRef } from 'react';
import logo from '../logo.svg';

export const ReactHeader = forwardRef((_props,ref) => (
    <header ref={ref} className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="fade-in-element">
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
        >
          Learn React
        </a>
    </header>
));

ReactHeader.displayName = 'ReactHeader';