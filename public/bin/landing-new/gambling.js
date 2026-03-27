var fetchedParts
var selectedParts = []
var rolled = false

function removeItemByAttribute(arr, attr, value) {
  return arr.filter(item => item[attr] !== value)
}
function addComponentsToPage(data) {
  document.querySelectorAll('.gambling-item-wrapper').forEach(element => {
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
    let spinnerItem = document.createElement('div')
    spinnerItem.className = 'spinner-item'

    let spinnerInfo = document.createElement('div')
    spinnerInfo.className = 'spinner-info'

    let spinnerImage = document.createElement('img')
    spinnerImage.src =
      'https://imgk.timesnownews.com/story/raccoon_GettyImages-914090712.jpg'
    spinnerImage.className = 'spinner-item-image'

    const h1 = document.createElement('h1')
    h1.classList.add('spinner-item-name')
    h1.innerText = component.name

    const p = document.createElement('p')
    p.classList.add('spinner-item-description')
    p.innerText = component.flavorText

    spinnerItem.appendChild(spinnerImage)
    spinnerInfo.appendChild(h1)
    spinnerInfo.appendChild(p)
    spinnerItem.appendChild(spinnerInfo)
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
  const inputParts = fetchedParts.filter(part => part.type == 'Input')
  const inputPart = sample(inputParts)
  chosenParts.push(inputPart)
  console.log(`For the input part, we picked ${inputPart.name}`)
  // for the second one, pick an output component
  const outputParts = fetchedParts.filter(part => part.type == 'Output')
  const outputPart = sample(outputParts)
  chosenParts.push(outputPart)
  console.log(`For the output part, we picked ${outputPart.name}`)
  // for the rest, pick any component
  const unusedParts = fetchedParts.filter(
    part => part.name != inputPart.name && part.name != outputPart.name
  )
  const thirdPart = sample(unusedParts)
  chosenParts.push(thirdPart)
  console.log(`For the third part, we picked ${thirdPart.name}`)
  let chosenPartNames = []
  document
    .querySelectorAll('.gambling-item-wrapper')
    .forEach((element, key) => {
      let thisPart = chosenParts[key]
      //console.log(`Hydrating part ${key} with ${thisPart.name}`)
      let spinnerImage = element.childNodes[2].childNodes[0]
      let partTitle = element.childNodes[2].childNodes[1].childNodes[0]
      let flavorText = element.childNodes[2].childNodes[1].childNodes[1]
      spinnerImage.src =
        thisPart.imageUrl == '' || thisPart.imageUrl == undefined
          ? 'https://awdev.codes/images/ww.gif'
          : thisPart.imageUrl
      //spinnerImage.src = (thisPart.imageUrl == "" || thisPart.imageUrl == undefined) ? localStorage.getItem("wokwi-pedro") : localStorage.getItem(thisPart.wokwiName)
      partTitle.innerText = thisPart.name
      flavorText.innerText = thisPart.flavorText
      chosenPartNames.push(thisPart.wokwiName)
    })
  selectedParts = chosenPartNames
}

const rollSound = new Howl({
  src: 'https://cloud-eclxkeatl-hack-club-bot.vercel.app/0mario-kart-item-box-sound-mp3cut_audio.mp4'
})

function rollParts(el) {
  if (el.classList.contains('disabled')) {
    return
  }
  if (!rolled) {
    document.querySelectorAll('.gambling-item-wrapper').forEach(element => {
      element.removeChild(element.firstElementChild)
    })
    addComponentsToPage(fetchedParts)
    rolled = true
  }
  document.querySelector('.gambling-build').classList.remove('disabled')
  rollSound.play()

  rollPartsAnimation(1200)
}

async function generateBuildLink(e) {
  if (!rolled) {
    return
  }
  e.classList.add('disabled')
  e.classList.add('loading')

  const parts = encodeURI(selectedParts.join('|'))
  const origin = window.location.origin
  const url = new URL(`${origin}/api/bin/wokwi/new/${parts}`)

  window.open(url, '_blank').focus()

  e.classList.remove('disabled')
  e.classList.remove('loading')
}

window.addEventListener('load', async e => {
  fetchedParts = (await partsData()).filter(p => p.rollable)
  document.querySelector('.gambling-roll').classList.remove('disabled')
})

async function generateProjectIdea() {
  if (
    document
      .querySelector('#generate-project-idea')
      .classList.contains('disabled')
  ) {
    return
  }

  document.querySelector('#project-idea').innerHTML =
    'Bin has ended! Thanks for participating.'
}
