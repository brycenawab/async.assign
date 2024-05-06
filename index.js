const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/$%7BCOHORT%7D/artists`

const state = {
    events: [],
};

const eventList = document.querySelector("#events")
const addEventList = document.querySelector("#addEvent")
addEventList.addEventListener("submit", addEvent);

async function render (){
    await getEvents()
    renderEvents()
}
render()

async function getEvents() {
    try{
        const response = await fetch(API_URL)
        const json = await response.json()
        state.events = json.data
    } catch (error) {
        console.log(error)
    }
}


function renderEvents(){
    const party = state.events.map((event) =>{
        const li = document.createElement("li");
        li.innerHTML = `
        <h3>${event.name}</h3>
        <h3>${event.description}</h3>
        <h3>${event.date}</h3>
        <h3>${event.location}</h3>`
        return li
    })
    eventList.replaceChildren(...party);
}

async function addEvent (event){
    event.preventDefault();
    try{
        const response = await fetch (API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: addEventList.name.value,
              date: addEventList.date.value,
              time: addEventList.time.value,
              location: addEventList.location.value,
              description: addEventList.description.value,
        })
    })
    render()
    }
    catch (error){
        console.log("error")
}
}