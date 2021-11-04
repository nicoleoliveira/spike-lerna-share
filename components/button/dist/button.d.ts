export declare class Button extends HTMLElement {
    shadow: ShadowRoot;
    clickEvent: Event;
    constructor();
    get disabled(): string;
    get danger(): string;
    get size(): string;
    get kind(): string;
    get type(): string;
    static get observedAttributes(): Array<string>;
    connectedCallback(): void;
    attributeChangedCallback(): void;
    /**
     * Aciona o foco no componente.
     */
    setFocus(): void;
    private onClick;
    private setDefaultKind;
    private setDefaultSize;
    private render;
}
