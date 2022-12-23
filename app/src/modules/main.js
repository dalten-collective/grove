import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable */
import { EditorView } from 'prosemirror-view';
const oldUpdateState = EditorView.prototype.updateState;
EditorView.prototype.updateState = function updateState(state) {
    if (!this.docView) {
        //return; // This prevents the matchesNode error on hot reloads
    }
    // (this as any).updateStateInner(state, this.state.plugins != state.plugins); //eslint-disable-line
    oldUpdateState.call(this, state);
};
import React from 'react';
import { render } from 'react-dom';
import App from '../components/archive/app';
import './assets/Inter-roman.var.woff2';
import './assets/Inter-italic.var.woff2';
import './assets/SourceCodePro-VariableFont_wght-subset.woff2';
import './styles/index.css';
const IS_MOCK = import.meta.env.MODE === 'mock' || import.meta.env.MODE === 'staging';
if (IS_MOCK) {
    window.ship = 'finned-palmer';
    window.our = '~finned-palmer';
}
window.our = `~${window.ship}`;
const root = document.getElementById('app');
render(_jsx(React.StrictMode, { children: _jsx(App, {}) }), root);
