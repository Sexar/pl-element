/**
 * Created by cesarmejia on 20/08/2017.
 */
module pl {

    export class Element<T extends HTMLElement> {

        // region Fields
        // endregion

        /**
         * Creates an element instance.
         * @param {HTMLElement} element
         */
        constructor(element: HTMLElement) {
            if (!(element instanceof HTMLElement))
                throw "Element Required";

            this._element = <T>element;
        }

        // region Methods
        /**
         * Adds the specified class to an element.
         * @param {string} className
         */
        addClass(className: string) {
            let el = this.element;

            if (el.classList) el.classList.add(className);
            else if (!this.hasClass(className)) el.className += " " + className;
        }

        /**
         * Append an element.
         * @param {pl.Element} element
         */
        append(element: Element) {
            this.element.appendChild(element.element);
        }

        /**
         * Get children children elements.
         * @returns {pl.ElementCollection}
         */
        children(): ElementCollection {
            return ElementCollection.fromNodeList(this.element.childNodes);
        }

        /**
         * Find first element match
         * @param {string} selector
         * @returns {pl.Element}
         */
        find(selector: string) {
            return new Element(<HTMLElement>this.element.querySelector(selector));
        }

        /**
         * Find elements match.
         * @param {string} selector
         * @returns {pl.ElementCollection}
         */
        findAll(selector: string): ElementCollection {
            return ElementCollection.fromNodeList(<NodeList>this.element.querySelectorAll(selector));
        }

        /**
         * Get first child of element.
         * @returns {Element}
         */
        firstChild(): Element {
            return new Element(<HTMLElement>this.element.firstChild);
        }

        /**
         * Determine whether any of the matched elements are assigned the given class.
         * @param {string} className
         * @returns {boolean}
         */
        hasClass(className: string): boolean {
            let el = this.element;

            return el.classList
                ? el.classList.contains(className)
                : new RegExp("\\b" + className + "\\b").test(el.className);
        }

        /**
         * Insert an HTML structure before a given DOM tree element.
         * @param {HTMLElement|Element} refElem
         */
        insertAfter(refElem: any) {
            let el = this.element;
            let refEl = (refElem instanceof Element) ? refElem.element : refElem;

            refEl.parentNode.insertBefore(el, refEl.nextSibling);
        }

        /**
         * Insert an HTML structure after a given DOM tree element.
         * @param {HTMLElement|Element} refElem
         */
        insertBefore(refElem: any) {
            let el = this.element;
            let refEl = (refElem instanceof Element) ? refElem.element : refElem;

            refEl.parentNode.insertBefore(el, refEl);
        }

        /**
         * Get next sibling.
         * @returns {pl.Element}
         */
        nextSibling(): Element {
            return this.element.nextSibling
                ? new Element(<HTMLElement>this.element.nextSibling)
                : null;
        }

        /**
         * Get next siblings.
         * @param {function} filter
         * @returns {pl.ElementCollection}
         */
        nextSiblings(filter): ElementCollection {
            let siblings: ElementCollection = new ElementCollection();
            let el: Element = this.nextSibling();

            do { if (!filter || filter(el)) { siblings.push(el); } } while (el = el.nextSibling());

            return siblings;
        }

        /**
         * Remove an event handler.
         * @param {string} type
         * @param {function} handler
         */
        off(type, handler) {
            let el = this.element;

            if ("detachEvent" in el) el['detachEvent'](`on${type}`, handler);
            else el.removeEventListener(type, handler);
        }

        /**
         * Attach an event handler function for selected element.
         * @param {string} type
         * @param {function} handler
         * @param {boolean} useCapture
         */
        on(type, handler, useCapture = false) {
            let el = this.element;

            if ("attachEvent" in el) el['attachEvent'](`on${type}`, handler);
            else el.addEventListener(type, handler, useCapture);
        }

        /**
         * Get parent element
         * @returns {pl.Element}
         */
        parent(): Element {
            return new Element(<HTMLElement>this.element.parentNode);
        }

        /**
         * Get previous sibling.
         * @returns {pl.Element}
         */
        prevSibling(): Element {
            return this.element.previousSibling
                ? new Element(<HTMLElement>this.element.previousSibling)
                : null;
        }

        /**
         * Get previous siblings.
         * @param {function} filter
         * @returns {pl.ElementCollection}
         */
        prevSiblings(filter): ElementCollection {
            let siblings: ElementCollection = new ElementCollection();
            let el: Element = this.prevSibling();

            do { if (!filter || filter(el)) { siblings.push(el); } } while (el = el.prevSibling());

            return siblings;
        }

        /**
         * Remove class from element.
         * @param {string} className
         */
        removeClass(className: string) {
            let el = this.element;

            if (el.classList) el.classList.remove(className);
            else el.className = el.className.replace(new RegExp("\\b\s?" + className + "\\b"), "");
        }

        /**
         * Get siblings of element or retrieve siblings that match a given selector.
         * @param {function} filter
         * @returns {pl.ElementCollection}
         */
        siblings(filter): ElementCollection {
            let siblings: ElementCollection = new ElementCollection();
            let parent: Element = this.parent();
            let el: Element = parent.firstChild();

            do { if (!filter || filter(el)) siblings.push(el); } while (el = el.nextSibling());

            return siblings;
        }

        /**
         * Get or set element text.
         * @param {any} value
         * @returns {undefined|text}
         */
        text(value: any) {
            if ("string" === typeof value) {
                this._element.innerText = value;
            } else {
                return this._element.innerText;
            }
        }

        /**
         * Add or remove class from element.
         * @param {string} className
         */
        toggleClass(className: string) {
            let el = this.element;

            if (el.classList) el.classList.toggle(className);
            else this.hasClass(className)
                ? this.removeClass(className)
                : this.addClass(className);
        }

        // endregion

        // region Properties
        /**
         * Property element.
         */
        private _element: T;

        /**
         * Gets the HTMLElement.
         * @returns {T}
         */
        get element(): T {
            return this._element;
        }
        // endregion

    }

}