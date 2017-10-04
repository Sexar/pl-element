/**
 * Created by cesarmejia on 01/10/2017.
 */
module pl {

    export class ElementCollection extends Array<Element<HTMLElement>> {

        /**
         * Create an element collection from a node list.
         * @param {NodeList} list
         * @returns {ElementCollection}
         */
        static fromNodeList(list: NodeList): ElementCollection {
            let collection = new ElementCollection();

            list.forEach(element => {
                collection.push(new Element(element as HTMLElement));
            });

            return collection;
        }

        /**
         * Create an element collection instance.
         */
        constructor() {
            super();
        }

    }

}
