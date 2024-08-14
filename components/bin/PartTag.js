import React from 'react'
import styles from './PartTag.module.css'

const PartTag = ({ partID }) => {

    let backgroundColor = '';
    let text = '';
    switch (partID) {
      case "recltWikgPdLvpJfe":
        backgroundColor = '#0000FF'; // Vibrant blue
        text = 'Servo';
        break;
      case "recRzllr0dui91NLd":
        backgroundColor = '#008000'; // Vibrant green
        text = 'LED';
        break;
      case "recM7OOofV9Bp7AM9":
        backgroundColor = '#FF0000'; // Vibrant red
        text = 'ESP32';
        break;
      case "recALoD1CCKt3CxKE": 
        backgroundColor = '#800080'; // Vibrant purple
        text = 'Buzzer';
        break;
      case "rechtwyljZ5WR8DtR":
        backgroundColor = '#FF4500'; // Vibrant orange
        text = 'Slider';
        break;
      case "recry1GsMO6QLakzw": 
        backgroundColor = '#8B4513'; // Dark brown
        text = 'Photoresistor';
        break;
      case "recjRu1vTAU3qDanE":
        backgroundColor = '#FF1493'; // Vibrant pink
        text = 'LCD';
        break;
      case "recrgS7NnxS42tkmg":
        backgroundColor = '#A52A2A'; // Vibrant brown
        text = 'LED Screen';
        break;
      case "recocuypi4xP0UgAj":
        backgroundColor = '#000000'; // Black
        text = 'Joystick';
        break;
      case "recgLUxtFZHufN70W":
        backgroundColor = '#1E90FF'; // Dodger blue
        text = 'LED Bar Graph';
        break; 
      case "recKBAnftT9PgppUC":
        backgroundColor = '#00FFFF'; // Vibrant cyan
        text = 'Shift Register';
        break;
      case "recibIXNCSdhDHjXD": 
        backgroundColor = '#FF00FF'; // Vibrant magenta
        text = 'Thermistor';
        break;
      case "recwSKHd3anpKqNbg":
        backgroundColor = '#00FF00'; // Vibrant lime
        text = 'IR Receiver';
        break;
      case "recLRovQNumB1Et8B":
        backgroundColor = '#008080'; // Vibrant teal
        text = 'Range Finder';
        break;
      case "recMVBkeJ4KQdZihl":
        backgroundColor = '#808000'; // Vibrant olive
        text = 'Keypad';
        break;
      case "recGrj5GpSExI18Ff": 
        backgroundColor = '#000080'; // Vibrant navy
        text = 'Humidity';
        break;
      case "rec9G0CAXM0kdp7HY": 
        backgroundColor = '#800000'; // Vibrant maroon
        text = 'RTC';
        break;
      case "rec4vTiJIx4UP8Thl": 
        backgroundColor = '#DAA520'; // Goldenrod
        text = 'Motion Sensor';
        break;
      case "reczWN9rZOY95VXOT":
        backgroundColor = '#FF8C00'; // Dark orange
        text = 'LED Matrix';
        break;
      case "recNjAmh8gF0gZNtI":
        backgroundColor = '#FF6347'; // Tomato red
        text = 'Accelerometer';
        break;
      case "recPmyV5b8cvaMtTk":
        backgroundColor = '#4B0082'; // Vibrant indigo
        text = 'Neopixel LED';
        break;
      case "recj5b4DKez4GNa8i":
        backgroundColor = '#87CEEB'; // Vibrant sky blue
        text = 'Relay';
        break;
      case "rec5TQNvkGkscsGuQ":
        backgroundColor = '#9932CC'; // Vibrant orchid
        text = 'Pico W';
        break;
      case "recqffGd1j1jRh56m":
        backgroundColor = '#DDA0DD'; // Vibrant plum
        text = 'Multicolor LED';
        break;
      case "recJUolkJURydamzG":
        backgroundColor = '#CD5C5C'; // Vibrant light coral
        text = 'Encoder';
        break;
      case "rec7lggt0DsgrWHzc":
        backgroundColor = '#20B2AA'; // Vibrant light sea green
        text = 'Temp Sensor';
        break;
      case "rectVgu4kWbbaqccc":
        backgroundColor = '#FFA07A'; // Vibrant light salmon
        text = 'Button';
        break;
      case "recWKEXSaByRvl68t":
        backgroundColor = '#4682B4'; // Vibrant light steel blue
        text = '4 Digit Display';
        break;
      default:
        backgroundColor = 'gray'; // Default gray
        text = 'Invalid Tag';
        console.log("invalid", partID)
    }
    
    
  return (
    <div style={{ backgroundColor}}
         className={styles.tag}>
      {text}
    </div>
  )
}

export default PartTag