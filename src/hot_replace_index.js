import React from 'react';
import {render} from 'react-dom';
import RootContainer from './containers/rootContainer.js';

if (module.hot) {
    module.hot.accept('./index.js', () => {
        const NextRootContainer = require('./containers/rootContainer.js').default;
        render(
            <NextRootContainer/>, document.getElementById('react-root'));
    }}
