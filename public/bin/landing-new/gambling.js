var fetchedParts;
async function fetchParts() {
    const response = await fetch('https://hackclub.com/api/bin/wokwi/parts/');
    if (!response.ok) {
        throw new Error('Network response was not ok.');
    }
    data = await response.json();
    data = removeItemByAttribute(data, "type", "Microprocessor");
    console.log(data)

    addComponentsToPage(data)
}
function removeItemByAttribute(arr, attr, value) {
    return arr.filter(item => item[attr] !== value);
}
function addComponentsToPage(data) {
    document.querySelectorAll(".gambling-item-wrapper").forEach((element) => {
        data.forEach((component) => {
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
        })
    })
}