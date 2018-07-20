import HyperHTMLElement from 'hyperhtml-element/esm';
import * as style from './index.scss'

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

        this.html`
        <style>
            ${this.externalStyle()}
        </style>
        <button class=${ 'mdc-button ' + `${mdcClasses}`} disabled=${this.state.disabled}>
            ${this.state.label}
            <slot></slot>
        </button>
        `;
    }
}

HyperButton.define('hyper-button');