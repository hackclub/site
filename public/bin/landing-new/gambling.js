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
        a: new Howl({ src: '/bin/yapping/a.wav' }),
        b: new Howl({ src: '/bin/yapping/b.wav' }),
        c: new Howl({ src: '/bin/yapping/c.wav' }),
        d: new Howl({ src: '/bin/yapping/d.wav' }),
        e: new Howl({ src: '/bin/yapping/e.wav' }),
        f: new Howl({ src: '/bin/yapping/f.wav' }),
        g: new Howl({ src: '/bin/yapping/g.wav' }),
        h: new Howl({ src: '/bin/yapping/h.wav' }),
        i: new Howl({ src: '/bin/yapping/i.wav' }),
        j: new Howl({ src: '/bin/yapping/j.wav' }),
        k: new Howl({ src: '/bin/yapping/k.wav' }),
        l: new Howl({ src: '/bin/yapping/l.wav' }),
        m: new Howl({ src: '/bin/yapping/m.wav' }),
        n: new Howl({ src: '/bin/yapping/n.wav' }),
        o: new Howl({ src: '/bin/yapping/o.wav' }),
        p: new Howl({ src: '/bin/yapping/p.wav' }),
        q: new Howl({ src: '/bin/yapping/q.wav' }),
        r: new Howl({ src: '/bin/yapping/r.wav' }),
        s: new Howl({ src: '/bin/yapping/s.wav' }),
        t: new Howl({ src: '/bin/yapping/t.wav' }),
        u: new Howl({ src: '/bin/yapping/u.wav' }),
        v: new Howl({ src: '/bin/yapping/v.wav' }),
        w: new Howl({ src: '/bin/yapping/w.wav' }),
        x: new Howl({ src: '/bin/yapping/x.wav' }),
        y: new Howl({ src: '/bin/yapping/y.wav' }),
        z: new Howl({ src: '/bin/yapping/z.wav' }),
        th: new Howl({ src: '/bin/yapping/th.wav' }),
        sh: new Howl({ src: '/bin/yapping/sh.wav' }),
        _: new Howl({ src: '/bin/yapping/_.wav' })
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
    document.querySelector(".gambling-build").classList.remove("disabled")
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

        // window.open(shareLink, '_blank').focus()
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
        fetchedParts.forEach(part => {
            if (!(part.imageUrl == undefined)) {
                console.log(part.wokwiName)
                saveImageToCache(part);
            }
        })
        saveImageToCache({ wokwiName: "wokwi-pedro", imageUrl: "https://awdev.codes/images/ww.gif" })
    });

    document.querySelector("#generate-project-idea").addEventListener("click", async (e) => {
        document.querySelector('#project-idea').innerText = "Thinking..."
        yap_sounds.thinking[getRandomInt(yap_sounds.thinking.length)].play();
        const res = await fetch('/api/bin/openai/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ parts: selectedParts })
        })
        const json = await res.json()
        document.querySelector('#project-idea').innerText = json.recommendation
        yap(json.recommendation)
    })
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

