import { transformBooleanProperties } from '@nicoleoliveira/common';

const style = `
  button {
    font-family: var(--font-family);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height);
    border-radius: var(--border-radius);
    border-width: var(--border-width);
    padding: var(--padding);

    letter-spacing: var(--letter-spacing-auto);
    width: inherit;
    border-style: solid;
    min-height: 2.75em;
    cursor: pointer;
  }

  button[size='small'], button[size='medium'], button[size='large'] {
    font-size: var(--font-size);
    line-height: var(--line-height);
    padding: var(--padding);
  }

  button[size='small'] {
    min-height: 2em;
  }
  
  button[size='large'] {
    min-height: 3.5em;
  }

  button[kind='primary'] {
    color: var(--text-color);
    background-color: var(--color);
    box-shadow: var(--shadow);

    border-color: transparent;
  }

  button[kind='primary']:hover {
    color: var(--text-color);
    background-color: var(--color-hover);
  }

  button[kind='primary']:active {
    background-color: var(--color-pressed);
  }


  button:focus, button:enabled:active {
    outline-color: var(--outline-color-focused);

    outline-width: var(--border-width-lg);
    outline-style: solid;
    outline-offset: 2px;
  }

  button[kind='secondary'] {
    color: var(--color);
    border-color: var(--color);

    background-color: transparent;
    box-shadow: var(--shadow-none);
  }

  button[kind='secondary']:hover {
    background-color: var(--background-hover);
    border-color: var(--border-color-hover);
    color: var(--border-color-hover);
  }

  button[kind='secondary']:enabled:active {
    background-color: var(--background-pressed);
    border-color: var(--border-color-hover);
    color: var(--border-color-hover);
  }

  button[kind='tertiary'] {
    color: var(--color);

    background-color: transparent;
    border-color: transparent;
    box-shadow: var(--shadow-none);
  }

  button[kind='tertiary']:hover {
    color: var(--border-color-hover);
    background-color: var(--background-hover);
  }

  button[kind='tertiary']:enabled:active {
    background-color: var(--background-pressed);
    color: var(--color-pressed);
  }

  button[kind='primary'][danger="true"] {
    color: var(--text-color-danger);
    background-color: var(--color-danger);

    border-color: transparent;
  }
  
  button[kind='primary'][danger="true"]:enabled:hover {
    background-color: var(--color-danger-hover);
  }
  
  button[kind='primary'][danger="true"]:enabled:active {
    background-color: var(--color-danger-pressed);
  }

  button[kind='secondary'][danger="true"] {
    color: var(--color-danger);
    border-color: var(--color-danger);
  }
  
  button[kind='secondary'][danger="true"]:enabled:hover {
    background-color: var(--background-danger-hover);
    border-color: var(--border-color-danger-hover);

    color: var(--border-color-danger-hover);
  }
  
  button[kind='secondary'][danger="true"]:enabled:active {
    background-color: var(--background-danger-pressed);
    border-color: var(--border-color-danger-hover);

    color: var(--border-color-danger-hover);
  }


  button:disabled {
    cursor: not-allowed; 
  }

  button[kind='primary']:disabled {
    color: var(--text-color-disabled);
    background-color: var(--color-disabled);
  }

  button[kind='secondary']:disabled {
    color: var(--color-disabled);
    border-color: var(--color-disabled);

    background-color: transparent;
  }

  button[kind='tertiary']:disabled {
    color: var(--color-disabled);

    background-color: transparent;
  }

`;

var ButtonKind;
(function (ButtonKind) {
    ButtonKind["primary"] = "primary";
    ButtonKind["secondary"] = "secondary";
    ButtonKind["tertiary"] = "tertiary";
})(ButtonKind || (ButtonKind = {}));

var ButtonType;
(function (ButtonType) {
    ButtonType["submit"] = "submit";
    ButtonType["button"] = "button";
    ButtonType["reset"] = "reset";
})(ButtonType || (ButtonType = {}));

var ButtonSize;
(function (ButtonSize) {
    ButtonSize["small"] = "small";
    ButtonSize["medium"] = "medium";
    ButtonSize["large"] = "large";
})(ButtonSize || (ButtonSize = {}));

class Button extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.clickEvent = document.createEvent('Event');
        this.clickEvent.initEvent('onClick', true, true);
        this.addEventListener('click', this.onClick);
    }
    get disabled() {
        const disabled = this.getAttribute('disabled');
        return transformBooleanProperties(disabled);
    }
    get danger() {
        const isTertiary = this.kind === ButtonKind.tertiary;
        const isDanger = isTertiary ? 'false' : this.getAttribute('danger');
        return transformBooleanProperties(isDanger);
    }
    get size() {
        const size = this.getAttribute('size');
        return !size || size === 'null' ? ButtonSize.medium : size;
    }
    get kind() {
        const kind = this.getAttribute('kind');
        return !kind || kind === 'null' ? ButtonKind.secondary : kind;
    }
    get type() {
        const type = this.getAttribute('type');
        return !type || type === 'null' ? ButtonType.button : type;
    }
    static get observedAttributes() {
        return ['kind', 'disabled', 'danger', 'type'];
    }
    connectedCallback() {
        this.render();
        this.setDefaultKind();
        this.setDefaultSize();
    }
    attributeChangedCallback() {
        this.render();
        this.setDefaultKind();
        this.setDefaultSize();
    }
    /**
     * Aciona o foco no componente.
     */
    setFocus() {
        this.shadow.querySelector('button').focus();
    }
    onClick() {
        if (this.disabled !== 'true') {
            this.dispatchEvent(this.clickEvent);
        }
    }
    setDefaultKind() {
        const includesKind = Object.values(ButtonKind).includes(this.getAttribute('kind'));
        if (!this.hasAttribute('kind') || !includesKind) {
            this.setAttribute('kind', ButtonKind.secondary);
        }
    }
    setDefaultSize() {
        const includesSize = Object.values(ButtonSize).includes(this.getAttribute('size'));
        if (!this.hasAttribute('size') || !includesSize) {
            this.setAttribute('size', ButtonSize.medium);
        }
    }
    render() {
        this.shadow.innerHTML = `
            <style>${style}</style>
            <button
              type="${this.type}"
              kind=${this.kind}
              size=${this.size}
              ${this.disabled === 'true' ? 'disabled' : ''}
              danger=${this.danger}>
                <slot></slot>
            </button>
        `;
    }
}
customElements.define('ani-button', Button);

export { Button };
//# sourceMappingURL=index.esm.js.map
