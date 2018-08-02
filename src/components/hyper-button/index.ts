import HyperHTMLElement from 'hyperhtml-element/esm';
import * as style from './index.scss'
import {MDCRipple} from '@material/ripple';

interface HyperButtonState {
    dense: boolean;
    disabled: boolean;
    icon: string;
    label: string;
    outlined: boolean;
    raised: boolean;
    unelevated: boolean;
}

export class HyperButton extends HyperHTMLElement<HyperButtonState> {
    dense?: boolean;
    disabled?: boolean;
    icon?: string;
    label?: string;
    outlined?: boolean;
    raised?: boolean;
    unelevated?: boolean;

    static get observedAttributes() {
        return ['dense', 'disabled', 'icon', 'label', 'outlined', 'raised', 'unelevated'];
    }

    get defaultState() {
        return {
            dense: this.dense != null,
            disabled: this.disabled != null,
            icon: this.icon || '',
            label: this.label || '',
            outlined: this.outlined != null,
            raised: this.raised != null,
            unelevated: this.unelevated != null
        };
    }

    attributeChangedCallback(attrName: string, prev: string, curr: string) {
        // switch (attrName) {
        //     case 'disabled':
        //         this.setState({ disabled: curr != null });
        //         // special boolean attribute handling 
        //         // async|autofocus|autoplay|capture|checked|controls|deferred|disabled|formnovalidate|hidden|loop|multiple|muted|required
        //         break;
        //     case 'raised':
        //         this.setState({ raised: !!curr || true });
        //         break;
        // }

        //do some things on change, demonstrating initial state
    }

    externalStyle() {
        return style;
    }

    created() {
        this.attachShadow({ mode: 'open', delegatesFocus: true });
        this.render();
        // const applyRippleTo = this.shadowRoot.querySelector('.mdc-button');
        // MDCRipple.attachTo(applyRippleTo);
    }

    classString(classInfo: { [name: string]: string | boolean | number }) {
        const o = [];
        for (const name in classInfo) {
            const v = classInfo[name];
            if (v) {
                o.push(name);
            }
        }
        return o.join(' ');
    }

    render() {
        const mdcClasses = this.classString(
            {
                'mdc-button--dense': this.state.dense,
                'mdc-button--outlined': this.state.outlined,
                'mdc-button--raised': this.state.raised,
                'mdc-button--unelevated': this.state.unelevated
            }
        );
        const externalStyle = this.externalStyle();

        this.html`
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <style>
            ${externalStyle}
        </style>
        <button class=${ 'mdc-button ' + `${mdcClasses}`} disabled=${this.state.disabled}>
            ${this.state.icon ? this.html`'<i class="material-icons mdc-button__icon">${this.state.icon}</i>` : ''}
            ${this.state.label}
            <slot></slot>
        </button>
        `;
    }
}

HyperButton.define('hyper-button');