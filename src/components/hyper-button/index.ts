import HyperHTMLElement from 'hyperhtml-element/esm';
import * as style from './index.scss'

interface HyperButtonState {
    disabled: boolean;
    raised: boolean;
}

export class HyperButton extends HyperHTMLElement<HyperButtonState> {
    disabled?: boolean;
    raised?: boolean;

    static get observedAttributes() { return ['disabled', 'raised']; }

    get defaultState() {
        return {
            disabled: false,
            raised: false
        };
    }

    attributeChangedCallback(attrName: string, prev: string, curr: string) {
        switch (attrName) {
            case 'disabled':
                this.setState({ disabled: !!curr || true });
                // special boolean attribute handling 
                // async|autofocus|autoplay|capture|checked|controls|deferred|disabled|formnovalidate|hidden|loop|multiple|muted|required
                break;
            case 'raised':
                this.setState({ raised: !!curr || true });
                break;
        }
    }

    externalStyle() {
        return style;
    }

    created() {
        this.attachShadow({ mode: 'open', delegatesFocus: true });
        this.render();
    }

    classString(classInfo: {[name: string]: string|boolean|number}) {
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
                'mdc-button--raised': this.state.raised
            }   
        );

        this.html`
        <style>${this.externalStyle()}</style>
        <button class=${'mdc-button ' + `${mdcClasses}`} disabled=${this.state.disabled}>
            <slot></slot>
        </button>
        `;
    }
}

HyperButton.define('hyper-button');