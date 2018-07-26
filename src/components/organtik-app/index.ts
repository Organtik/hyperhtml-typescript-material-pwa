import HyperHTMLElement from 'hyperhtml-element/esm';

import { HyperButton } from '../hyper-button';

export class OrgantikApp extends HyperHTMLElement {
    created() {
        this.attachShadow({ mode: 'open' });
        this.render();
    }
    render() {
        this.html`
            <style>
                .app-fab--absolute {
                    position: fixed;
                    bottom: 1rem;
                    right: 1rem;
                }
            
                @media(min-width: 1024px) {
                    .app-fab--absolute {
                        bottom: 1.5rem;
                        right: 1.5rem;
                    }
                }
            </style>
            <hyper-button>Here we go!</hyper-button>
            <hyper-button disabled>Disabled</hyper-button>
            <hyper-button raised>Raised</hyper-button>
            <hyper-button dense>Dense</hyper-button>
            <hyper-button outlined>Outlined</hyper-button>
            <hyper-button unelevated>Unelevated</hyper-button>
            <hyper-button label="labeled"></hyper-button>
            <hyper-button icon="favorite">Favorite</hyper-button>
            <hyper-fab class="app-fab--absolute" icon="favorite"></hyper-fab>
        `;
    }
}

OrgantikApp.define('organtik-app');