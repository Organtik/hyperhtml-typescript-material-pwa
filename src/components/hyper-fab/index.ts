import HyperHTMLElement from 'hyperhtml-element/esm';
import * as style from './index.scss'
import { MDCRipple } from '@material/ripple';

interface HyperFabState {
    disabled: boolean;
    exited: boolean;
    icon: string;
    label: string;
    mini: boolean;
}

export class HyperFab extends HyperHTMLElement<HyperFabState> {
    disabled?: boolean;
    exited?: boolean;
    icon?: string;
    label?: string;
    mini?: boolean;

    get defaultState() {
        return {
            disabled: this.disabled != null,
            exited: this.exited != null,
            icon: this.icon || '',
            label: this.label || '',
            mini: this.mini != null
        };
    }

    static get observedAttributes() {
        return ['disabled', 'exited', 'icon', 'label', 'mini'];
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
                'mdc-fab--mini': this.state.mini,
                'mdc-fab--exited': this.state.exited
            }
        );
        const externalStyle = this.externalStyle();

        this.html`
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <style>${externalStyle}
        </style>
        <button class=${ 'mdc-fab ' + `${mdcClasses}`} disabled=${this.state.disabled} aria-label=${this.state.label || this.state.icon}>
            ${this.state.icon ? this.html`<i class="material-icons mdc-fab">${this.state.icon}</i>` : ''}
        </button>
        `;
    }
}

HyperFab.define('hyper-fab');