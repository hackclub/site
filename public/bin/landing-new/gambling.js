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

async function fetchParts() {
    const response = await fetch('https://hackclub.com/api/bin/wokwi/parts/');
    if (!response.ok) {
        throw new Error('Network response was not ok.');
    }
    data = await response.json();

    data = removeItemByAttribute(data, "type", "Microprocessor");
    console.log(data)
    return data
}/*
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

function rollParts() {
    if (!rolled) {
        document.querySelectorAll(".gambling-item-wrapper").forEach((element) => {
            element.removeChild(element.firstElementChild)
        })
        addComponentsToPage(fetchedParts)
    }
    rolled = true
    document.querySelector(".gambling-build").classList.remove("disabled")
    let chosenParts = []
    const numPartsNeeded = document.querySelectorAll(".gambling-item-wrapper").length
    // for the first one, pick an input component
    const inputParts = fetchedParts.filter((part) => part.type == "Input");
    const inputPartIndex = Math.floor(Math.random() * inputParts.length)
    chosenParts.push(inputParts[inputPartIndex])
    console.log(`For the input part, we picked ${inputParts[inputPartIndex].name}`)
    // for the second one, pick an output component
    const outputParts = fetchedParts.filter((part) => part.type == "Output");
    const outputPartIndex = Math.floor(Math.random() * outputParts.length)
    chosenParts.push(outputParts[outputPartIndex])
    console.log(`For the output part, we picked ${outputParts[outputPartIndex].name}`)
    // for the rest, pick any component
    for (let i = 2; i < numPartsNeeded; i++) {
        let partIndex = Math.floor(Math.random() * fetchedParts.length)
        chosenParts.push(fetchedParts[partIndex])
        console.log(`For the ${i}th part, we picked ${fetchedParts[partIndex].name}`)
    }
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


async function generateBuildLink(e) {
    if (!rolled) {
        return
    }
    e.classList.add("disabled")
    e.classList.add("loading")
    const payload = {
        parts: selectedParts
    };

    try {
        const response = await fetch('/api/bin/wokwi/new/', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const json = await response.json()
        const shareLink = json.shareLink

        window.open(shareLink, '_blank').focus()
    } catch (error) {
        console.error('Error:', error)
        // e.classList.add("error")
    }
    e.classList.remove("disabled")
    e.classList.remove("loading")
}
window.addEventListener("load", (e) => {
    fetchParts().then(parts => {
        fetchedParts = parts;
        /*fetchedParts.forEach(part => {
            if (!(part.imageUrl == undefined)) {
                console.log(part.wokwiName)
                saveImageToCache(part);
            }
        })*/
        //saveImageToCache({ wokwiName: "wokwi-pedro", imageUrl: "https://awdev.codes/images/ww.gif" })
    });
})

async function yap(text) {
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
                continue;
            } else if (char === ',' || char === '?' || char === '.') {
                yap_queue.push(yap_sounds.talking['_']);
                continue;
            } else if (char === text[i - 1]) { // skip repeat letters
                continue;
            }
        } catch (e) {
            // who cares. pick up a foot ball
        }
        if (!char.match(/[a-zA-Z.]/)) {
            continue; // skip characters that are not letters or periods
        }
        yap_queue.push(yap_sounds.talking[char]);
    }

    function next_yap() {
        if (yap_queue.length === 0) return;
        let noise = yap_queue.shift();
        noise.rate(2 * (Math.random() * .50 + 1.9));
        noise.once('end', next_yap)
        console.log(noise)
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
    const res = await fetch('/api/bin/openai/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ parts: selectedParts })
    })
    const json = await res.json()
    document.querySelector('#project-idea').innerHTML = json.recommendation
    document.querySelector('#generate-project-idea').src = "https://cloud-cyo3pqn0f-hack-club-bot.vercel.app/0statement_rac.png"
    document.querySelector('#generate-project-idea').classList.remove('disabled')
    yap(json.recommendation)
}

function thinkingWords() {
    const arr = [
        "thinking",
        "single neuron activated",
        "2 braincells rubbing together",
        "processing",
        "calculating",
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
