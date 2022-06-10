import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';

import {ConfigProvider, AdaptivityProvider} from "@vkontakte/vkui";

const rootNode = document.getElementById('root');
ReactDOM.render(
    <ConfigProvider>
        <AdaptivityProvider>
            <App />
        </AdaptivityProvider>
    </ConfigProvider>
, rootNode);