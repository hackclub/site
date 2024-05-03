var fetchedParts;
var rolled = false;
async function fetchParts() {
    /*
    const response = await fetch('https://hackclub.com/api/bin/wokwi/parts/');
    if (!response.ok) {
        throw new Error('Network response was not ok.');
    }
    data = await response.json();

    data = removeItemByAttribute(data, "type", "Microprocessor");
    console.log(data)*/
    data = [
        {
            "name": "Motion Sensor",
            "flavorText": "Detects movement.",
            "type": "Component",
            "wokwiName": "wokwi-pir-motion-sensor",
            "wokwiXOffset": 89
        },
        {
            "name": "Temperature Sensor",
            "flavorText": "Temp checker!",
            "type": "Component",
            "wokwiName": "board-ds18b20",
            "wokwiXOffset": 32.88
        },
        {
            "name": "Clock (RTC)",
            "flavorText": "It's a clock!",
            "type": "Component",
            "wokwiName": "wokwi-ds1307",
            "wokwiXOffset": 99
        },
        {
            "name": "Buzzer",
            "flavorText": "Make noise!",
            "type": "Component",
            "wokwiName": "wokwi-buzzer",
            "notes (internal)": "Double check if active or passive",
            "wokwiXOffset": 69
        },
        {
            "name": "Humidity",
            "flavorText": "Moisture monitor",
            "imageUrl": "https://cloud-q01dbzfhj-hack-club-bot.vercel.app/1humidity.png",
            "type": "Component",
            "wokwiName": "wokwi-dht22",
            "notes (internal)": "We actually send the dht11",
            "wokwiXOffset": 56
        },
        {
            "name": "Rotary Encoder",
            "flavorText": "Detect spinning!",
            "type": "Component",
            "wokwiName": "wokwi-ky-040",
            "wokwiXOffset": 120
        },
        {
            "name": "Shift Register",
            "flavorText": "Switch inputs!",
            "type": "Component",
            "wokwiName": "wokwi-74hc595",
            "wokwiXOffset": 76
        },
        {
            "name": "Range finder",
            "flavorText": "Measure distance!",
            "type": "Component",
            "wokwiName": "wokwi-hc-sr04",
            "wokwiXOffset": 168.7
        },
        {
            "name": "Keypad",
            "flavorText": "Dial a number!",
            "type": "Component",
            "wokwiName": "wokwi-membrane-keypad",
            "wokwiXOffset": 264.8
        },
        {
            "name": "Accelerometer",
            "flavorText": "Speedchecker!",
            "type": "Component",
            "wokwiName": "wokwi-mpu6050",
            "wokwiXOffset": 82
        },
        {
            "name": "Neopixel LED",
            "flavorText": "Technicolor!",
            "type": "Component",
            "wokwiName": "wokwi-neopixel",
            "wokwiXOffset": 21
        },
        {
            "name": "LED",
            "flavorText": "It's lit!",
            "imageUrl": "https://cloud-q01dbzfhj-hack-club-bot.vercel.app/4led.png",
            "type": "Component",
            "wokwiName": "wokwi-led",
            "wokwiXOffset": 24
        },
        {
            "name": "Stepper Motor",
            "flavorText": "It spins!",
            "type": "Component",
            "wokwiName": "wokwi-stepper-motor,wokwi-a4988",
            "wokwiXOffset": 162
        },
        {
            "name": "Slider",
            "flavorText": "A sliding input!",
            "type": "Component",
            "wokwiName": "wokwi-slide-potentiometer",
            "wokwiXOffset": 210.2
        },
        {
            "name": "Thermistor",
            "flavorText": "Temperature checker!",
            "type": "Component",
            "wokwiName": "wokwi-ntc-temperature-sensor",
            "wokwiXOffset": 139
        },
        {
            "name": "Relay",
            "flavorText": "Turn things on and off!",
            "imageUrl": "https://cloud-q01dbzfhj-hack-club-bot.vercel.app/0relay.png",
            "type": "Component",
            "wokwiName": "wokwi-relay-module",
            "wokwiXOffset": 130
        },
        {
            "name": "LCD",
            "flavorText": "Display text!",
            "type": "Component",
            "wokwiName": "wokwi-lcd1602",
            "wokwiXOffset": 303.2
        },
        {
            "name": "Servo",
            "flavorText": "Move stuff",
            "type": "Component",
            "wokwiName": "wokwi-servo",
            "wokwiXOffset": 178.2
        },
        {
            "name": "Joystick",
            "flavorText": "It's a joystick!",
            "type": "Component",
            "wokwiName": "wokwi-analog-joystick",
            "wokwiXOffset": 98
        },
        {
            "name": "Potentiometer",
            "flavorText": "It's a dial!",
            "type": "Component",
            "wokwiName": "wokwi-potentiometer",
            "wokwiXOffset": 76.6
        },
        {
            "name": "Multicolor LED",
            "flavorText": "Now, in color!",
            "type": "Component",
            "wokwiName": "wokwi-rgb-led",
            "wokwiXOffset": 30
        },
        {
            "name": "Photoresistor",
            "flavorText": "Detect light!",
            "type": "Component",
            "wokwiName": "wokwi-photoresistor-sensor",
            "wokwiXOffset": 173.6
        },
        {
            "name": "Button",
            "flavorText": "Bop it!",
            "type": "Component",
            "wokwiName": "wokwi-pushbutton",
            "wokwiXOffset": 67
        },
        {
            "name": "IR Reciever",
            "flavorText": "Detect Infrared!",
            "imageUrl": "https://cloud-q01dbzfhj-hack-club-bot.vercel.app/2ir.png",
            "type": "Component",
            "wokwiName": "wokwi-ir-receiver",
            "wokwiXOffset": 62
        },
        {
            "name": "LED Matrix",
            "flavorText": "Display stuff!",
            "type": "Component",
            "wokwiName": "wokwi-max7219-matrix",
            "wokwiXOffset": 340
        }
    ]
    return data
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
    let results = {}
    let counter = 0
    document.querySelectorAll(".gambling-item-wrapper").forEach((element) => {
        let randomThingy = getRandomInt(fetchedParts.length - 1)
        let spinnerImage = element.childNodes[2].childNodes[0]
        let partTitle = element.childNodes[2].childNodes[1]
        let flavorText = element.childNodes[2].childNodes[2]
        let result = fetchedParts[randomThingy]
        spinnerImage.src = (result.imageURL == "" || result.imageURL == undefined) ? "https://awdev.codes/images/ww.gif" : result.imageURL
        partTitle.innerText = result.name;
        flavorText.innerText = result.flavorText;
        results[counter] = result.wokwiName
        counter++;
    })
    console.log(results)
}
function generateBuildLink(selectedParts) {
    const payload = {
        parts: selectedParts
    };

    fetch('https://hackclub.com/api/bin/wokwi/new', {
        mode: 'no-cors',
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
            console.log('Response:', data);
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });

}
window.addEventListener("load", (e) => {
    fetchParts().then(parts => { fetchedParts = parts });
})