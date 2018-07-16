import HyperHTMLElement from 'hyperhtml-element/esm';

export class OrgantikApp extends HyperHTMLElement {
    created() {
        this.attachShadow({ mode: 'open' });
        this.render();
    }
    render() {
        this.html`Here we go!`;
    }
}

OrgantikApp.define('organtik-app');