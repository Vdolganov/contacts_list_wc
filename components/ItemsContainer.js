const template1 = document.createElement("template");

template1.innerHTML = `
 <div id="items-container"> 
 </div>
`;

class ItemsContainer extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template1.content.cloneNode(true));
        this.parent = this._shadowRoot.querySelector('#items-container');
    }

    connectedCallback() {
        this.subscribeData()
    }

    renderList(data) {
        this.parent.innerHTML = '';
        for(let item in data) {
            const element = document.createElement('list-item');
            element.fullname = `${data[item].name.title} ${data[item].name.first} ${data[item].name.last}`
            this.parent.appendChild(element)
        }
    };

    subscribeData() {
        emitter.subscribe('results', data => {
            this.renderList(data.value)
        })
    }

}

customElements.define("items-container", ItemsContainer);
