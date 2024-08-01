function rainbowColor(index, total) {
    const hue = (360 / total) * index;
    return `hsl(${hue}, 74%, 71%)`;
}

function rainbow(element) {
    const text = element.innerText.trim();
    const letters = text.split('');
    element.innerHTML = letters.map((letter, index) => {
        const color = rainbowColor(index, letters.length);
        return `<span style="color: ${color}">${letter}</span>`;
    }).join('');
}

document.querySelectorAll(".rainbow").forEach(element => {
    rainbow(element);
});