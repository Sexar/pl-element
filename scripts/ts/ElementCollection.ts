/**
 * Created by cesarmejia on 01/10/2017.
 */
module pl {

    export class ElementCollection extends Array<Element<HTMLElement>> {

        // region Static
        /**
         * Create an element collection from a node list.
         * @param {NodeList} list
         * @returns {pl.ElementCollection}
         */
        static fromNodeList(list: NodeList): ElementCollection {
            let collection = new ElementCollection();

            list.forEach(element => {
                collection.push(new Element(element as HTMLElement));
            });

            return collection;
        }

        /**
         * Create an element collection from an array.
         * @param {Array<Element>} list
         * @returns {pl.ElementCollection}
         */
        static fromArray(list: Array): ElementCollection {
            let collection = new ElementCollection();

            list.forEach(element => {
                collection.push(new Element(element as HTMLElement))
            });

            return collection;
        }
        // endregion

        /**
         * Create an element collection instance.
         */
        constructor() {
            super();

            // Set the prototype explicitly.
            // Sigh!! https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
            Object.setPrototypeOf(this, Array.prototype);
        }

        // region Methods
        /**
         * Set one or more attributes to elements in collection.
         * @param {any} attrName
         * @param {string} value
         */
        attr(attrName: any, value: string = "") {
            let i, el;

            for (i = 0; el = this[i], i < this.length; i++) {
                el.attr(attrName, value);
            }
        }

        /**
         * Adds the specified class to elements in collection.
         * @param {string} className
         */
        addClass(className: string) {
            let i, el;

            for (i = 0; el = this[i], i < this.length; i++) {
                console.log(el);
                el.addClass(className);
            }
        }

        /**
         * Remove elements from DOM.
         */
        remove() {
            let i, el;

            for (i = 0; el = this[i], i < this.length; i++) {
                el.remove();
            }
        }

        /**
         * Remove an attribute from elements in collection.
         * @param {string} attrName
         */
        removeAttr(attrName: string) {
            let i, el;

            for (i = 0; el = this[i], i < this.length; i++) {
                el.removeAttribute(attrName);
            }
        }

        /**
         * Remove class from elements in collection.
         * @param {string} className
         */
        removeClass(className: string) {
            let i, el;

            for (i = 0; el = this[i], i < this.length; i++) {
                el.removeClass(className);
            }
        }
        // endregion

    }

}
