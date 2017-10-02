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
        public addClass(className: string) {
            let el = this.element;

            if (el.classList) el.classList.add(className);
            else if (!this.hasClass(className)) el.className += " " + className;
        }

        /**
         * Find first element match
         * @param {string} selector
         * @returns {Element}
         */
        public find(selector: string) {
            return new Element(<HTMLElement>this.element.querySelector(selector));
        }

        /**
         *
         */
        public findAll() {

        }

        /**
         * Determine whether any of the matched elements are assigned the given class.
         * @param {string} className
         * @returns {boolean}
         */
        public hasClass(className: string): boolean {
            let el = this.element;

            return el.classList
                ? el.classList.contains(className)
                : new RegExp("\\b" + className + "\\b").test(el.className);
        }

        /**
         * Insert an HTML structure before a given DOM tree element.
         * @param {HTMLElement|Element} refElem
         */
        public insertAfter(refElem: any) {
            let el = this.element;
            let refEl = (refElem instanceof Element) ? refElem.element : refElem;

            refEl.parentNode.insertBefore(el, refEl.nextSibling);
        }

        /**
         * Insert an HTML structure after a given DOM tree element.
         * @param {HTMLElement|Element} refElem
         */
        public insertBefore(refElem: any) {
            let el = this.element;
            let refEl = (refElem instanceof Element) ? refElem.element : refElem;

            refEl.parentNode.insertBefore(el, refEl);
        }

        /**
         * Remove an event handler.
         * @param {string} type
         * @param {function} handler
         */
        public off(type, handler) {
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
        public on(type, handler, useCapture = false) {
            let el = this.element;

            if ("attachEvent" in el) el['attachEvent'](`on${type}`, handler);
            else el.addEventListener(type, handler, useCapture);
        }

        /**
         * Remove class from element.
         * @param {string} className
         */
        public removeClass(className: string) {
            let el = this.element;

            if (el.classList) el.classList.remove(className);
            else el.className = el.className.replace(new RegExp("\\b\s?" + className + "\\b"), "");
        }

        /**
         * Add or remove class from element.
         * @param {string} className
         */
        public toggleClass(className: string) {
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