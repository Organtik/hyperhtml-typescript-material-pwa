import HyperHTMLElement from 'hyperhtml-element/esm';

import { HyperButton } from '../hyper-button';

import firebase from 'firebase/app';
import 'firebase/auth';

export class OrgantikApp extends HyperHTMLElement {
    firebaseApp?: firebase.app.App;

    handleLoginClick(e) {
        const provider = new firebase.auth.GoogleAuthProvider();
        let auth: firebase.auth.Auth = firebase.auth();
        auth.useDeviceLanguage();
        auth.signInWithRedirect(provider);
    }
    handleLogoutClick(e) {
        const provider = new firebase.auth.GoogleAuthProvider();
        let auth: firebase.auth.Auth = firebase.auth();
        auth.signOut();
    }

    created() {
        this.attachShadow({ mode: 'open' });

        var config = {
            apiKey: "AIzaSyC_0IVhN2deEbQBTk4MgsTcMn5Is5dWKMs",
            authDomain: "hyperhtml-ts-material-pwa.firebaseapp.com",
            projectId: "hyperhtml-ts-material-pwa"
        };
        this.firebaseApp = firebase.initializeApp(config);

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
            <hyper-button onclick=${this.handleLoginClick} raised>Login</hyper-button>
            <hyper-button onclick=${this.handleLogoutClick} raised>Logout</hyper-button>
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