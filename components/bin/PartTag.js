import React from 'react'
import styles from './PartTag.module.css'

const PartTag = ({ partID }) => {

    let backgroundColor = '';
    let text = '';
    switch (partID) {
        case "rectVgu4kWbbaqccc":
          backgroundColor = 'green';
          text = 'Button';
          break;
        case "rec4vTiJIx4UP8Thl":
          backgroundColor = 'orange';
          text = 'Motion';
          break;
        case "recALoD1CCKt3CxKE":
          backgroundColor = 'red';
          text = 'Buzzer';
          break;
        case "recGrj5GpSExI18Ff":
          backgroundColor = 'blue';
          text = 'Humidity';
          break;
        case "recRzllr0dui91NLd":
          backgroundColor = 'purple';
          text = 'LED';
          break; 
        case "recry1GsMO6QLakzw":
          backgroundColor = 'yellow';
          text = 'Photoresistor';
          break;
        case "recPmyV5b8cvaMtTk":
          backgroundColor = 'pink';
          text = 'Neopixel LED';
          break;
        case "recqffGd1j1jRh56m":
          backgroundColor = 'brown';
          text = 'Multicolor LED';
          break;
        case "recwSKHd3anpKqNbg":
          backgroundColor = 'black';
          text = 'Servo Motor';
          break;
        default:
          backgroundColor = 'gray';
          text = 'Invalid Tag';
      }
  return (
    <div style={{ backgroundColor}}
         className={styles.tag}>
      {text}
    </div>
  )
}

export default PartTag