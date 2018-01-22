var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Created by cesarmejia on 08/10/2017.
 */
var pl;
(function (pl) {
    var Collection = /** @class */ (function () {
        // endregion
        /**
         * Create a collection instance.
         */
        function Collection() {
            // region Static
            // endregion
            // region Fields
            /**
             * Indicates current position in the collection.
             * @type {number}
             */
            this.pointer = 0;
            /**
             * Length of collection.
             * @type {number}
             * @private
             */
            this._length = 0;
        }
        // region Methods
        /**
         * Adds an element.
         * @param {T} element
         */
        Collection.prototype.add = function (element) {
            this[this._length++] = element;
        };
        /**
         * Adds an array of elements.
         * @param {Array<T>} elements
         */
        Collection.prototype.addArray = function (elements) {
            for (var i = 0; i < elements.length; i++) {
                this.add(elements[i]);
            }
        };
        /**
         * Adds a collection of elements.
         * @param {Collection<T>} collection
         */
        Collection.prototype.addCollection = function (collection) {
            for (var i = 0; i < collection.length; i++) {
                this.add(collection[i]);
            }
        };
        /**
         * Clears the collection.
         */
        Collection.prototype.clear = function () {
            while (this.length > 0) {
                this.removeAt(0);
            }
        };
        /**
         * Returns a value indicating if the specified element is contained.
         * @param {T} element
         */
        Collection.prototype.contains = function (element) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == element)
                    return true;
            }
            return false;
        };
        /**
         * Iterates through the collection.
         * @param {function} handler
         */
        Collection.prototype.each = function (handler) {
            for (var i = 0; i < this.count; i++) {
                handler.call(this, this[i], i);
            }
        };
        /**
         * Gets the index of the specified element if found. -1 if not found.
         * @param {T} item
         * @returns {number}
         */
        Collection.prototype.indexOf = function (item) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] === item) {
                    return i;
                }
            }
            return -1;
        };
        /**
         * Gets the item at the specified position.
         * @param {number} index
         * @returns {T}
         */
        Collection.prototype.item = function (index) {
            return this[index];
        };
        /**
         * Returns the object on current pointer and moves the pointer forward.
         * It returns null and resets pointer if end of collection reached.
         * @returns {T}
         */
        Collection.prototype.next = function () {
            if (this.pointer >= this.length) {
                this.pointer = 0;
                return null;
            }
            return this[this.pointer++];
        };
        /**
         * Removes the specified item from the collection
         * @param {T} item
         */
        Collection.prototype.remove = function (item) {
            var buffer = [];
            var index = -1;
            //region Clear this
            for (var i = 0; i < this.length; i++) {
                var t = this[i];
                delete this[i];
                if (t === item) {
                    index = i;
                }
                else {
                    buffer.push(t);
                }
            }
            //endregion
            //region Apply buffer
            for (var j = 0; j < buffer.length; j++) {
                this[j] = buffer[j];
            }
            this._length = buffer.length;
            //endregion
            return this;
        };
        /**
         * Removes the item ath the specified index
         * @param {number} index
         */
        Collection.prototype.removeAt = function (index) {
            this.remove(this[index]);
        };
        /**
         * Resets the internal pointer for calls to <c>next()</c> method.
         */
        Collection.prototype.resetPointer = function () {
            this.pointer = 0;
        };
        Object.defineProperty(Collection.prototype, "count", {
            // endregion
            // region Properties
            /**
             * Counter of elements in collection.
             * @returns {number}
             */
            get: function () {
                return this._length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Collection.prototype, "first", {
            /**
             * Gets the first element of the collection
             * @returns {T}
             */
            get: function () {
                return this.length > 0 ? this[0] : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Collection.prototype, "last", {
            /**
             * Gets the last element of the collection
             * @returns {T}
             */
            get: function () {
                return (this.length > 0 ? this[this.length - 1] : null);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Collection.prototype, "length", {
            /**
             * Gets the length of the collection.
             * @returns {number}
             */
            get: function () {
                return this._length;
            },
            enumerable: true,
            configurable: true
        });
        return Collection;
    }());
    pl.Collection = Collection;
})(pl || (pl = {}));
/**
 * Created by cesarmejia on 20/08/2017.
 */
(function (pl) {
    var PLEvent = /** @class */ (function () {
        // endregion
        /**
         * Create a PLEvent instance.
         * @constructor
         */
        function PLEvent() {
            this._handlers = [];
            this._scope = this || window;
        }
        // region Methods
        /**
         * Add new handler.
         * @param {function} handler
         */
        PLEvent.prototype.add = function (handler) {
            if (handler) {
                this._handlers.push(handler);
            }
        };
        /**
         * Excecute all suscribed handlers.
         */
        PLEvent.prototype.fire = function () {
            var _this = this;
            var args = arguments;
            this._handlers.forEach(function (handler) {
                handler.apply(_this._scope, args);
            });
        };
        /**
         * Remove handler from handlers.
         * @param {function} handler
         */
        PLEvent.prototype.remove = function (handler) {
            this._handlers = this._handlers.filter(function (fn) {
                if (fn != handler)
                    return fn;
            });
        };
        return PLEvent;
    }());
    pl.PLEvent = PLEvent;
})(pl || (pl = {}));
/**
 * Created by cesarmejia on 20/08/2017.
 */
(function (pl) {
    var Element = /** @class */ (function () {
        // endregion
        // region Fields
        // endregion
        /**
         * Creates an element instance.
         * @param {HTMLElement} element
         */
        function Element(element) {
            if (!(element instanceof HTMLElement))
                throw "Element Required";
            this._element = element;
        }
        // region Static
        /**
         * Shortcut to create an element instance.
         * @param {string} tag
         * @returns {pl.Element}
         */
        Element.create = function (tag) {
            if (tag === void 0) { tag = 'div'; }
            var parts = tag.split('.');
            var tagName = parts.shift();
            var element = new Element(document.createElement(tagName));
            for (var i = 0; i < parts.length; i++) {
                element.addClass(parts[i]);
            }
            return element;
        };
        // region Methods
        /**
         * Set one or more attributes to element.
         * @param {any} attrName
         * @param {string} value
         */
        Element.prototype.attr = function (attrName, value) {
            if (value === void 0) { value = ""; }
            var el = this.element;
            if (attrName instanceof Object) {
                for (var i in attrName) {
                    el.setAttribute(i, attrName[i]);
                }
            }
            else {
                el.setAttribute(attrName, value);
            }
        };
        /**
         * Adds the specified class to an element.
         * @param {string} className
         */
        Element.prototype.addClass = function (className) {
            var el = this.element;
            if (el.classList)
                el.classList.add(className);
            else if (!this.hasClass(className))
                el.className += " " + className;
        };
        /**
         * Append an element.
         * @param {any} element
         */
        Element.prototype.append = function (elements) {
            if (elements instanceof pl.ElementCollection) {
                var i = void 0, el = void 0;
                for (i = 0; el = elements[i], i < elements.length; i++) {
                    this.element.appendChild(el.element);
                }
            }
            else if (elements instanceof Element) {
                this.element.appendChild(elements.element);
            }
        };
        /**
         * Get children children elements.
         * @returns {pl.ElementCollection}
         */
        Element.prototype.children = function () {
            return pl.ElementCollection.fromNodeList(this.element.childNodes);
        };
        /**
         * Create a deep copy of a DOM element.
         * @param {boolean} deep
         * @returns {pl.Element}
         */
        Element.prototype.clone = function (deep) {
            return new Element(this.element.cloneNode(deep));
        };
        /**
         * Get the first element that matches the selector by testing the element itself and traversing
         * up through its ancestors in the DOM tree.
         * TODO: Remember that exists native method matches in Element.
         * @param {string} selector
         * @returns {pl.Element}
         */
        Element.prototype.closest = function (selector) {
            var el = this;
            while (el && !el.match(selector)) {
                el = el.parent();
            }
            return el ? el : null;
        };
        /**
         * Get the value of a computed style property for the element.
         * @param {any} prop
         * @param {any} value
         * @returns {string|null}
         */
        Element.prototype.css = function (prop, value) {
            if (value === void 0) { value = undefined; }
            var el = this.element;
            if (prop instanceof Object) {
                for (var i in prop) {
                    el.style[i] = prop[i];
                }
            }
            else if ("string" === typeof prop && "string" === typeof value) {
                el.style[prop] = value;
            }
            else {
                var style = window.getComputedStyle ? window.getComputedStyle(el, null) : el['currentStyle'];
                return style[prop];
            }
        };
        /**
         * Remove all child nodes of an element from the DOM
         */
        Element.prototype.empty = function () {
            this.element.innerHTML = '';
        };
        /**
         * Find first element match
         * @param {string} selector
         * @returns {pl.Element}
         */
        Element.prototype.find = function (selector) {
            return new Element(this.element.querySelector(selector));
        };
        /**
         * Find elements match.
         * @param {string} selector
         * @returns {pl.ElementCollection}
         */
        Element.prototype.findAll = function (selector) {
            return pl.ElementCollection.fromNodeList(this.element.querySelectorAll(selector));
        };
        /**
         * Get first child of element.
         * @returns {Element|null}
         */
        Element.prototype.firstChild = function () {
            var firstChild = this.element.firstChild;
            return firstChild ? new Element(this.element.firstChild) : null;
        };
        /**
         * Determine whether any of the matched elements are assigned the given class.
         * @param {string} className
         * @returns {boolean}
         */
        Element.prototype.hasClass = function (className) {
            var el = this.element;
            return el.classList
                ? el.classList.contains(className)
                : new RegExp("\\b" + className + "\\b").test(el.className);
        };
        /**
         * Get or set the HTML contents of the element.
         * @param {any} html
         * @returns {string}
         */
        Element.prototype.html = function (html) {
            var el = this.element;
            if ("string" === typeof html) {
                el.innerHTML = html;
            }
            else {
                return el.innerHTML;
            }
        };
        /**
         * Get the current computed inner height for the element, including padding but not border.
         * @returns {number}
         */
        Element.prototype.innerHeight = function () {
            return this.element.clientHeight;
        };
        /**
         * Get the current computed inner width for the element, including padding but not border.
         * @returns {number}
         */
        Element.prototype.innerWidth = function () {
            return this.element.clientWidth;
        };
        /**
         * Insert an HTML structure before a given DOM tree element.
         * @param {HTMLElement|Element} refElem
         */
        Element.prototype.insertAfter = function (refElem) {
            var el = this.element;
            var refEl = (refElem instanceof Element) ? refElem.element : refElem;
            refEl.parentNode.insertBefore(el, refEl.nextSibling);
        };
        /**
         * Insert an HTML structure after a given DOM tree element.
         * @param {HTMLElement|Element} refElem
         */
        Element.prototype.insertBefore = function (refElem) {
            var el = this.element;
            var refEl = (refElem instanceof Element) ? refElem.element : refElem;
            refEl.parentNode.insertBefore(el, refEl);
        };
        /**
         * Returns a boolean it the element would be selected by the specified selector.
         * TODO: Remember that exists native method matches in Element.
         * @param {string} selector
         * @returns {boolean}
         */
        Element.prototype.match = function (selector) {
            var el = this.element, nodes = (el['parentNode'] || el['document']).querySelectorAll(selector), i = -1;
            while (nodes[++i] && nodes[i] != el)
                ;
            return !!nodes[i];
        };
        /**
         * Get next sibling.
         * @returns {pl.Element}
         */
        Element.prototype.nextSibling = function () {
            return this.element.nextSibling
                ? new Element(this.element.nextSibling)
                : null;
        };
        /**
         * Get next siblings.
         * @param {function} filter
         * @returns {pl.ElementCollection}
         */
        Element.prototype.nextSiblings = function (filter) {
            var siblings = new pl.ElementCollection();
            var el = this.nextSibling();
            do {
                if (!filter || filter(el)) {
                    siblings.add(el);
                }
            } while (el = el.nextSibling());
            return siblings;
        };
        /**
         * Remove an event handler.
         * @param {string} type
         * @param {function} handler
         */
        Element.prototype.off = function (type, handler) {
            var el = this.element;
            if ("detachEvent" in el)
                el['detachEvent']("on" + type, handler);
            else
                el.removeEventListener(type, handler);
        };
        /**
         * Get the current computed outer height (including padding, border, and optionally margin) for the element.
         * @param {boolean} includeMargin
         * @returns {number}
         */
        Element.prototype.outerHeight = function (includeMargin) {
            var marginTop = includeMargin ? parseFloat(this.css('margin-top')) : 0, marginBottom = includeMargin ? parseFloat(this.css('margin-bottom')) : 0;
            return this.element.offsetHeight + marginTop + marginBottom;
        };
        /**
         * Get the current computed outer width (including padding, border, and optionally margin) for the element.
         * @param {boolean} includeMargin
         * @returns {number}
         */
        Element.prototype.outerWidth = function (includeMargin) {
            var marginLeft = includeMargin ? parseFloat(this.css('margin-left')) : 0, marginRight = includeMargin ? parseFloat(this.css('margin-right')) : 0;
            return this.element.offsetHeight + marginLeft + marginRight;
        };
        /**
         * Get the current coordinates of the element relative to his parent.
         * @returns {Object}
         */
        Element.prototype.position = function () {
            return {
                left: this.element.offsetLeft,
                top: this.element.offsetTop
            };
        };
        /**
         * Insert an element at the beginning of the element in context.
         * @param {pl.Element} element
         */
        Element.prototype.prepend = function (element) {
            var el = this.element;
            //el.insertBefore(element.element, el.firstChild);
            el.insertBefore(element.element, el.childNodes[0]);
        };
        /**
         * Get the current coordinates of the element relative to his parent.
         * @returns {Object}
         */
        Element.prototype.offset = function () {
            var rect = this.element.getBoundingClientRect();
            var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
        };
        /**
         * Attach an event handler function for selected element.
         * @param {string} type
         * @param {function} handler
         * @param {boolean} useCapture
         */
        Element.prototype.on = function (type, handler, useCapture) {
            if (useCapture === void 0) { useCapture = false; }
            var el = this.element;
            if ("attachEvent" in el)
                el['attachEvent']("on" + type, handler);
            else
                el.addEventListener(type, handler, useCapture);
        };
        /**
         * Get parent element.
         * TODO: Check for possible errors with validation with HTMLDocument.
         * @returns {pl.Element|null}
         */
        Element.prototype.parent = function () {
            var parent = this.element.parentNode;
            return !(parent instanceof HTMLDocument) && parent ? new Element(parent) : null;
        };
        /**
         * Get previous sibling.
         * @returns {pl.Element}
         */
        Element.prototype.prevSibling = function () {
            return this.element.previousSibling
                ? new Element(this.element.previousSibling)
                : null;
        };
        /**
         * Get previous siblings.
         * @param {function} filter
         * @returns {pl.ElementCollection}
         */
        Element.prototype.prevSiblings = function (filter) {
            var siblings = new pl.ElementCollection();
            var el = this.prevSibling();
            do {
                if (!filter || filter(el)) {
                    siblings.add(el);
                }
            } while (el = el.prevSibling());
            return siblings;
        };
        /**
         * Remove element from DOM.
         */
        Element.prototype.remove = function () {
            var el = this.element;
            el.parentNode.removeChild(el);
        };
        /**
         * Remove an attribute from element.
         * @param {string} attrName
         */
        Element.prototype.removeAttr = function (attrName) {
            var el = this.element;
            el.removeAttribute(attrName);
        };
        /**
         * Remove class from element.
         * @param {string} className
         */
        Element.prototype.removeClass = function (className) {
            var el = this.element;
            if (el.classList)
                el.classList.remove(className);
            else
                el.className = el.className.replace(new RegExp("\\b\s?" + className + "\\b"), "");
        };
        /**
         * Remove an element from the DOM tree and insert a new one in its place.
         * @param newElement
         */
        Element.prototype.replace = function (newElement) {
            var el = this.element;
            el.parentNode.replaceChild(newElement.element, el);
        };
        /**
         * Get or set the current vertical position of the scroll bar for the element.
         * @param {any} value
         * @returns {number|null}
         */
        Element.prototype.scrollLeft = function (value) {
            if ("number" === typeof value) {
                this.element.scrollLeft = value;
            }
            else {
                return this.element.scrollLeft;
            }
        };
        /**
         * Get or set the current vertical position of the scroll bar for the element.
         * @param {any} value
         * @returns {number|null}
         */
        Element.prototype.scrollTop = function (value) {
            if ("number" === typeof value) {
                this.element.scrollTop = value;
            }
            else {
                return this.element.scrollTop;
            }
        };
        /**
         * Get siblings of element or retrieve siblings that match a given selector.
         * @param {function} filter
         * @returns {pl.ElementCollection}
         */
        Element.prototype.siblings = function (filter) {
            var siblings = new pl.ElementCollection();
            var parent = this.parent();
            var el = parent.firstChild();
            do {
                if (!filter || filter(el))
                    siblings.add(el);
            } while (el = el.nextSibling());
            return siblings;
        };
        /**
         * Get or set element text.
         * @param {any} value
         * @returns {undefined|text}
         */
        Element.prototype.text = function (value) {
            if ("undefined" !== typeof value) {
                this._element.innerText = String(value);
            }
            else {
                return this._element.innerText;
            }
        };
        /**
         * Add or remove class from element.
         * @param {string} className
         */
        Element.prototype.toggleClass = function (className) {
            var el = this.element;
            if (el.classList)
                el.classList.toggle(className);
            else
                this.hasClass(className)
                    ? this.removeClass(className)
                    : this.addClass(className);
        };
        /**
         * Execute all handlers and behaviors attached to the matched elements for the given event type.
         * @param {string} type
         */
        Element.prototype.trigger = function (type) {
            if ('createEvent' in document) {
                // Modern browsers, IE9+
                var ev = document.createEvent('HTMLEvents');
                ev.initEvent(type, false, true);
                this._element.dispatchEvent(ev);
            }
            else {
                // IE8
                // let ev = document.createEventObject();
                // ev.eventType = type;
                // this._element.fireEvent(`on${ type }`);
            }
        };
        /**
         * Remove the parents of an element from the DOM, leaving the element's content in place.
         */
        Element.prototype.unwrap = function () {
            var el = this.element;
            var parent = el.parentNode;
            while (el.firstChild)
                parent.insertBefore(el.firstChild, el);
            parent.removeChild(el);
        };
        /**
         * Wrap element into a new container.
         * @param {pl.Element} container
         */
        Element.prototype.wrap = function (container) {
            var el = this.element;
            var containerEl = container.element;
            el.parentNode.insertBefore(containerEl, el);
            containerEl.appendChild(el);
        };
        Object.defineProperty(Element.prototype, "element", {
            /**
             * Gets the HTMLElement.
             * @returns {T}
             */
            get: function () {
                return this._element;
            },
            enumerable: true,
            configurable: true
        });
        return Element;
    }());
    pl.Element = Element;
})(pl || (pl = {}));
/**
 * Created by cesarmejia on 01/10/2017.
 */
(function (pl) {
    var ElementCollection = /** @class */ (function (_super) {
        __extends(ElementCollection, _super);
        // endregion
        /**
         * Create an element collection instance.
         */
        function ElementCollection() {
            return _super.call(this) || this;
        }
        // region Static
        /**
         * Create an element collection from a node list.
         * @param {NodeList} list
         * @returns {pl.ElementCollection}
         */
        ElementCollection.fromNodeList = function (list) {
            var collection = new ElementCollection();
            var i, el;
            for (i = 0; el = list[i], i < list.length; i++) {
                collection.add(new pl.Element(el));
            }
            return collection;
        };
        /**
         * Create an element collection from an array.
         * @param {Array<any>} list
         * @returns {pl.ElementCollection}
         */
        ElementCollection.fromArray = function (list) {
            var collection = new ElementCollection();
            var i, el;
            for (i = 0; el = list[i], i < list.length; i++) {
                if (el instanceof pl.Element) {
                    collection.add(el);
                }
                else if (el instanceof HTMLElement) {
                    collection.add(new pl.Element(el));
                }
            }
            return collection;
        };
        // region Methods
        /**
         * Set one or more attributes to elements in collection.
         * @param {any} attrName
         * @param {string} value
         */
        ElementCollection.prototype.attr = function (attrName, value) {
            if (value === void 0) { value = ""; }
            var i, el;
            this.each(function (el, index) { el.attr(attrName, value); });
        };
        /**
         * Adds the specified class to elements in collection.
         * @param {string} className
         */
        ElementCollection.prototype.addClass = function (className) {
            var i, el;
            this.each(function (el, index) { el.addClass(className); });
        };
        /**
         * Remove elements from DOM.
         */
        ElementCollection.prototype.removeItems = function () {
            var i, el;
            this.each(function (el, index) { el.remove(); });
        };
        /**
         * Remove an attribute from elements in collection.
         * @param {string} attrName
         */
        ElementCollection.prototype.removeAttr = function (attrName) {
            var i, el;
            this.each(function (el, index) { el.removeAttr(attrName); });
        };
        /**
         * Remove class from elements in collection.
         * @param {string} className
         */
        ElementCollection.prototype.removeClass = function (className) {
            var i, el;
            this.each(function (el, index) { el.removeClass(className); });
        };
        return ElementCollection;
    }(pl.Collection));
    pl.ElementCollection = ElementCollection;
})(pl || (pl = {}));
