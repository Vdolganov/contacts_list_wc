let allMembers = [];

const fetchMembers = async (count) => {
   const answer = await fetch(`https://randomuser.me/api/?results=${count}`);
   const data = answer.json();
    data.then(data => {
      emitter.emit('results', {value: data.results});
      console.log(data.results);
        allMembers = data.results;
   });
   return answer && data || false
};

document.addEventListener('DOMContentLoaded', ()=> {
    fetchMembers(50);

    emitter.subscribe('search', data => {
        let filteredList = allMembers.filter(el => `${el.name.title} ${el.name.first} ${el.name.last}`.includes(data.data));
        console.log(filteredList);
        emitter.emit('results', {value: filteredList});
    } )
});