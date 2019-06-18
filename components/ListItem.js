const template = document.createElement("template");

template.innerHTML = `
<style>
    div{
        width: 100%;
        padding: 1px 20px;
        font-size: 32px;
        box-sizing: border-box;
        box-shadow: 2px 2px 6px gray;
        margin: 10px 0;
    }
</style>
 <div> 
     <p></p>
 </div>
`;

class ListItem extends HTMLElement {
  constructor() {
    super();

      this._shadowRoot = this.attachShadow({ 'mode': 'open' });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this.itemContentBlock = this._shadowRoot.querySelector('p');
  }

  static get observedAttributes() {
    return ["fullname"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
      if(name === 'fullname') {
          this.fullname = newValue;
      }
  }

  get fullname() {
    return this.shadowRoot.querySelector("p").textContent;
  }

  set fullname(val) {
    if (val) {
      this.shadowRoot.querySelector("p").textContent = val;
    } else {
      this.shadowRoot.querySelector("p").innerHTML = "default value";
    }
  }
}

customElements.define("list-item", ListItem);
