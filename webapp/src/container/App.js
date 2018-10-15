import React, { Component } from 'react';
import './App.css';
import Blockchain from './blockchain/blockchain';

class App extends React.Component {
    render() {
        return <div className="App">
            <Blockchain />
        </div>;
    }
}

export default App;
