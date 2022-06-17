import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App/App';

import {ConfigProvider, AdaptivityProvider, WebviewType, AppRoot} from "@vkontakte/vkui";

const rootNode = document.getElementById('root');
ReactDOM.render(
    <ConfigProvider
        webviewType={WebviewType.INTERNAL}
    >
        <AdaptivityProvider>
            <AppRoot>
                <App />
            </AppRoot>
        </AdaptivityProvider>
    </ConfigProvider>
, rootNode);