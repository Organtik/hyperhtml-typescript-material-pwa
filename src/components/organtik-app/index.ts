import HyperHTMLElement from 'hyperhtml-element/esm';

import { HyperButton } from '../hyper-button'; 

export class OrgantikApp extends HyperHTMLElement {
    created() {
        this.attachShadow({ mode: 'open' });
        this.render();
    }
    render() {
        this.html`
            <hyper-button>Here we go!</hyper-button>
            <hyper-button disabled>Disabled</hyper-button>
            <hyper-button raised>Raised</hyper-button>
            <hyper-button dense>Dense</hyper-button>
            <hyper-button outlined>Outlined</hyper-button>
            <hyper-button unelevated>Unelevated</hyper-button>
            <hyper-button label="labeled"></hyper-button
        `;
    }
}

OrgantikApp.define('organtik-app');