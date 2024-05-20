var fetchedParts;
var selectedParts = []
var rolled = false;


let yap_sounds = {
    // ty caleb!
    thinking: [
        new Howl({ src: '/bin/yapping/thonk1.wav' }),
        new Howl({ src: '/bin/yapping/thonk2.wav' }),
        new Howl({ src: '/bin/yapping/thonk3.wav' }),
    ],
    talking: {
        // these sounds and most of the yapping code are adapted from https://github.com/equalo-official/animalese-generator
        a: new Howl({ src: '/bin/yapping/a.wav', volume: 0.16 }),
        b: new Howl({ src: '/bin/yapping/b.wav', volume: 0.16 }),
        c: new Howl({ src: '/bin/yapping/c.wav', volume: 0.16 }),
        d: new Howl({ src: '/bin/yapping/d.wav', volume: 0.16 }),
        e: new Howl({ src: '/bin/yapping/e.wav', volume: 0.16 }),
        f: new Howl({ src: '/bin/yapping/f.wav', volume: 0.16 }),
        g: new Howl({ src: '/bin/yapping/g.wav', volume: 0.16 }),
        h: new Howl({ src: '/bin/yapping/h.wav', volume: 0.16 }),
        i: new Howl({ src: '/bin/yapping/i.wav', volume: 0.16 }),
        j: new Howl({ src: '/bin/yapping/j.wav', volume: 0.16 }),
        k: new Howl({ src: '/bin/yapping/k.wav', volume: 0.16 }),
        l: new Howl({ src: '/bin/yapping/l.wav', volume: 0.16 }),
        m: new Howl({ src: '/bin/yapping/m.wav', volume: 0.16 }),
        n: new Howl({ src: '/bin/yapping/n.wav', volume: 0.16 }),
        o: new Howl({ src: '/bin/yapping/o.wav', volume: 0.16 }),
        p: new Howl({ src: '/bin/yapping/p.wav', volume: 0.16 }),
        q: new Howl({ src: '/bin/yapping/q.wav', volume: 0.16 }),
        r: new Howl({ src: '/bin/yapping/r.wav', volume: 0.16 }),
        s: new Howl({ src: '/bin/yapping/s.wav', volume: 0.16 }),
        t: new Howl({ src: '/bin/yapping/t.wav', volume: 0.16 }),
        u: new Howl({ src: '/bin/yapping/u.wav', volume: 0.16 }),
        v: new Howl({ src: '/bin/yapping/v.wav', volume: 0.16 }),
        w: new Howl({ src: '/bin/yapping/w.wav', volume: 0.16 }),
        x: new Howl({ src: '/bin/yapping/x.wav', volume: 0.16 }),
        y: new Howl({ src: '/bin/yapping/y.wav', volume: 0.16 }),
        z: new Howl({ src: '/bin/yapping/z.wav', volume: 0.16 }),
        th: new Howl({ src: '/bin/yapping/th.wav', volume: 0.16  }),
        sh: new Howl({ src: '/bin/yapping/sh.wav', volume: 0.16  }),
        _: new Howl({ src: '/bin/yapping/_.wav', volume: 0.16  })
    }
};

// async function fetchParts() {
//     const response = await fetch('https://hackclub.com/api/bin/wokwi/parts/');
//     if (!response.ok) {
//         throw new Error('Network response was not ok.');
//     }
//     data = await response.json();

//     data = removeItemByAttribute(data, "type", "Microprocessor");
//     console.log(data)
//     return data
// }
/*
async function preloadImage(item) {
    let response = await fetch(item.imageUrl);
    let blob = response.blob();
    return blob
}
async function saveImageToCache(item) {
    const image = await preloadImage(item)
    const blob = URL.createObjectURL(image)
    localStorage.setItem(item.wokwiName, blob);
}*/
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

        let spinnerInfo = document.createElement("div")
        spinnerInfo.className = "spinner-info"

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
        spinnerInfo.appendChild(h1);
        spinnerInfo.appendChild(p);
        spinnerItem.appendChild(spinnerInfo);
        element.appendChild(spinnerItem)
    })
}

function sample(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function rollPartsAnimation(ms = 1000) {
    for (let i = 0; i < ms; i += 100) {
        setTimeout(() => {
            randomizeParts()
        }, i)
    }
    setTimeout(() => {
        randomizeParts()
    }, ms + 200)
    setTimeout(() => {
        randomizeParts()
    }, ms + 500)
}

function randomizeParts() {
    let chosenParts = []
    // for the first one, pick an input component
    const inputParts = fetchedParts.filter((part) => part.type == "Input");
    const inputPart = sample(inputParts)
    chosenParts.push(inputPart)
    console.log(`For the input part, we picked ${inputPart.name}`)
    // for the second one, pick an output component
    const outputParts = fetchedParts.filter((part) => part.type == "Output");
    const outputPart = sample(outputParts)
    chosenParts.push(outputPart)
    console.log(`For the output part, we picked ${outputPart.name}`)
    // for the rest, pick any component
    const unusedParts = fetchedParts.filter((part) => part.name != inputPart.name && part.name != outputPart.name)
    const thirdPart = sample(unusedParts)
    chosenParts.push(thirdPart)
    console.log(`For the third part, we picked ${thirdPart.name}`)
    let chosenPartNames = []
    document.querySelectorAll(".gambling-item-wrapper").forEach((element, key) => {
        let thisPart = chosenParts[key]
        //console.log(`Hydrating part ${key} with ${thisPart.name}`)
        let spinnerImage = element.childNodes[2].childNodes[0]
        let partTitle = element.childNodes[2].childNodes[1].childNodes[0]
        let flavorText = element.childNodes[2].childNodes[1].childNodes[1]
        spinnerImage.src = (thisPart.imageUrl == "" || thisPart.imageUrl == undefined) ? "https://awdev.codes/images/ww.gif" : thisPart.imageUrl
        //spinnerImage.src = (thisPart.imageUrl == "" || thisPart.imageUrl == undefined) ? localStorage.getItem("wokwi-pedro") : localStorage.getItem(thisPart.wokwiName)
        partTitle.innerText = thisPart.name;
        flavorText.innerText = thisPart.flavorText;
        chosenPartNames.push(thisPart.wokwiName)
    })
    selectedParts = chosenPartNames
}

const rollSound = new Howl({ src: 'https://cloud-eclxkeatl-hack-club-bot.vercel.app/0mario-kart-item-box-sound-mp3cut_audio.mp4'})

function rollParts(el) {
    if (el.classList.contains("disabled")) {
        return
    }
    if (!rolled) {
        document.querySelectorAll(".gambling-item-wrapper").forEach((element) => {
            element.removeChild(element.firstElementChild)
        })
        addComponentsToPage(fetchedParts)
        rolled = true
    }
    document.querySelector(".gambling-build").classList.remove("disabled")
    rollSound.play()
    
    rollPartsAnimation(1200)
}


async function generateBuildLink(e) {
    if (!rolled) {
        return
    }
    e.classList.add("disabled")
    e.classList.add("loading")

    const parts = encodeURI(selectedParts.join('|'))
    const origin = window.location.origin
    const url = new URL(`${origin}/api/bin/wokwi/new/${parts}`)

    window.open(url, '_blank').focus()

    e.classList.remove("disabled")
    e.classList.remove("loading")
}

window.addEventListener("load", async (e) => {
    fetchedParts = (await partsData()).filter(p => p.rollable)
    document.querySelector(".gambling-roll").classList.remove("disabled")
})

async function yap(text, letterCallback) {
    text = text.toLowerCase();
    const yap_queue = [];
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        try {
            if (char === 's' && text[i + 1] === 'h') { // test for 'sh' sound
                yap_queue.push(yap_sounds.talking['sh']);
                continue;
            } else if (char === 't' && text[i + 1] === 'h') { // test for 'th' sound
                yap_queue.push(yap_sounds.talking['th']);
                continue;
            } else if (char === 'h' && (text[i - 1] === 's' || text[i - 1] === 't')) { // test if previous letter was 's' or 't' and current letter is 'h'
                yap_queue.push(yap_sounds.talking['_']);
                continue;
            } else if (char === ',' || char === '?' || char === '.') {
                yap_queue.push(yap_sounds.talking['_']);
                continue;
            } else if (char === text[i - 1]) { // skip repeat letters
                yap_queue.push(yap_sounds.talking['_']);
                continue;
            }
        } catch (e) {
            // who cares. pick up a foot ball
        }
        if (!char.match(/[a-zA-Z.]/)) {
            yap_queue.push(yap_sounds.talking['_']);
            continue; // skip characters that are not letters or periods
        }
        yap_queue.push(yap_sounds.talking[char]);
    }

    function next_yap() {
        letterCallback(yap_queue.length)
        if (yap_queue.length === 0) return;
        let noise = yap_queue.shift();
        noise.rate(2 * (Math.random() * .50 + 1.9));
        noise.once('end', next_yap)
        noise.play();
    }

    next_yap();
}


async function generateProjectIdea() {
    if (document.querySelector('#generate-project-idea').classList.contains('disabled')) { return }

    yap_sounds.thinking[getRandomInt(yap_sounds.thinking.length)].play();
    document.querySelector('#generate-project-idea').classList.add('disabled')
    document.querySelector('#project-idea').innerHTML = "<em>" + thinkingWords() + "..." + "</em>"
    document.querySelector('#generate-project-idea').src = "https://cloud-80eg2m8id-hack-club-bot.vercel.app/0thinking_rac.png"
    let text = ""
    if (selectedParts.length == 0) {
        text = "You need to rummage for some parts first!"
    } else {
        const res = await fetch('/api/bin/openai/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ parts: selectedParts })
        })
        const json = await res.json()
        text = json.recommendation
    }
    document.querySelector('#project-idea').innerHTML = ""
    document.querySelector('#generate-project-idea').src = "https://cloud-cyo3pqn0f-hack-club-bot.vercel.app/0statement_rac.png"
    document.querySelector('#generate-project-idea').classList.remove('disabled')
    yap(text, i => {
        document.querySelector('#project-idea').innerHTML = text.slice(0, Math.max(text.length - i + 1, 0))
    })
}

function thinkingWords() {
    const arr = [
        "thinking",
        "single neuron activated",
        "2 braincells rubbing together",
        "pondering",
        "contemplating",
        "rackin' my brain",
        "*raccoon rumination noises*",
        "raccooninating",
        "thinking about trash",
        "rummaging through my thoughts",
        "wishing you a garbage day"]
    return arr[Math.floor(Math.random() * arr.length)]
}
