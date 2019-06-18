class Searchinput extends HTMLElement{
    constructor() {
        super();
        this.events = {
            "input": new CustomEvent("search-input.changed", {
                detail: ''
            }),
        };
        this.inputStyle = `
        width: 100%;
        padding: 20px;
        font-size: 32px;
        box-sizing: border-box;
        box-shadow: 2px 2px 6px gray;
        `;
        this.innerHTML = `<input class="search-input" style="${this.inputStyle}"/>`;
        this.querySelector('.search-input').addEventListener('input', (e)=> {
            emitter.emit('search', {data: e.target.value});

            /*this.events['input'] = new CustomEvent("search-input.changed", {
                detail: e.target.value
            });
            this.dispatchEvent(this.events["input"]);*/
        })
    }
}

customElements.define("search-input", Searchinput);