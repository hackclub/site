var fetchedParts;
var selectedParts = []
var rolled = false;
async function fetchParts() {
    const response = await fetch('https://hackclub.com/api/bin/wokwi/parts/');
    if (!response.ok) {
        throw new Error('Network response was not ok.');
    }
    data = await response.json();

    data = removeItemByAttribute(data, "type", "Microprocessor");
    console.log(data)
    return data
}
async function preloadImage(item) {
    let response = await fetch(item.imageUrl);
    let blob = response.blob();
    return blob
}
async function saveImageToCache(item) {
    const image = await preloadImage(item)
    const blob = URL.createObjectURL(image)
    localStorage.setItem(item.wokwiName, blob);
}
function removeItemByAttribute(arr, attr, value) {
    return arr.filter(item => item[attr] !== value);
}
function addComponentsToPage(data) {
    document.querySelectorAll(".gambling-item-wrapper").forEach((element) => {
        /*data.forEach((component) => {
            let spinnerItem = document.createElement("div")
            spinnerItem.className = "spinner-item"

            let spinnerImage = document.createElement("img")
            spinnerImage.src = "../parts/humidity.png"
            spinnerImage.className = "spinner-item-image"

            const h1 = document.createElement('h1');
            h1.classList.add('spinner-item-name');
            h1.innerText = component.name;

            const p = document.createElement('p');
            p.classList.add('spinner-item-description');
            p.innerText = component.flavorText;

            spinnerItem.appendChild(spinnerImage);
            spinnerItem.appendChild(h1);
            spinnerItem.appendChild(p);
            element.appendChild(spinnerItem)
        })*/
        let component = data[0]
        let spinnerItem = document.createElement("div")
        spinnerItem.className = "spinner-item"

        let spinnerImage = document.createElement("img")
        spinnerImage.src = "https://imgk.timesnownews.com/story/raccoon_GettyImages-914090712.jpg"
        spinnerImage.className = "spinner-item-image"

        const h1 = document.createElement('h1');
        h1.classList.add('spinner-item-name');
        h1.innerText = component.name;

        const p = document.createElement('p');
        p.classList.add('spinner-item-description');
        p.innerText = component.flavorText;

        spinnerItem.appendChild(spinnerImage);
        spinnerItem.appendChild(h1);
        spinnerItem.appendChild(p);
        element.appendChild(spinnerItem)
    })
}

function rollParts() {
    if (!rolled) {
        document.querySelectorAll(".gambling-item-wrapper").forEach((element) => {
            element.removeChild(element.firstElementChild)
        })
        addComponentsToPage(data)
    }
    rolled = true
    let results = []
    document.querySelectorAll(".gambling-item-wrapper").forEach((element) => {
        let randomThingy = getRandomInt(fetchedParts.length - 1)
        let spinnerImage = element.childNodes[2].childNodes[0]
        let partTitle = element.childNodes[2].childNodes[1]
        let flavorText = element.childNodes[2].childNodes[2]
        let result = fetchedParts[randomThingy]
        //spinnerImage.src = (result.imageUrl == "" || result.imageUrl == undefined) ? "https://awdev.codes/images/ww.gif" : result.imageUrl
        spinnerImage.src = (result.imageUrl == "" || result.imageUrl == undefined) ? localStorage.getItem("wokwi-pedro") : localStorage.getItem(result.wokwiName)
        partTitle.innerText = result.name;
        flavorText.innerText = result.flavorText;
        results.push(result.wokwiName)
    })
    selectedParts = results
}


function generateBuildLink() {
    const payload = {
        parts: selectedParts
    };

    fetch('/api/bin/wokwi/new/', {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            //console.log('Response:', data);
            location.href = data.shareLink
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });

}
window.addEventListener("load", (e) => {
    fetchParts().then(parts => {
        fetchedParts = parts;
        fetchedParts.forEach(part => {
            if (!(part.imageUrl == undefined)) {
                console.log(part.wokwiName)
                saveImageToCache(part);
            }
        })
        saveImageToCache({ wokwiName: "wokwi-pedro", imageUrl: "https://awdev.codes/images/ww.gif" })
    });
})