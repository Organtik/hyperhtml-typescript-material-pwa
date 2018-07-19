import HyperHTMLElement from 'hyperhtml-element/esm';
import * as style from './index.scss'


export class HyperButton extends HyperHTMLElement {

    externalStyle() {
        return style;
    }

    created() {
        this.attachShadow({mode: 'open', delegatesFocus: true});
        this.render();
    }

    render() {
        this.html`
        <style>
            ${this.externalStyle()}
        </style>
        <button class="mdc-button"><slot></slot></button>
        `;
    }
}

HyperButton.define('hyper-button');