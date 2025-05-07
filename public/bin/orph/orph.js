window.addEventListener("load", (e) => {
    const link = document.createElement('link');
    link.href = '../orph.css';
    link.rel = 'stylesheet';

    document.getElementsByTagName('head')[0].appendChild(link);


    const orph = document.createElement("img")
    orph.src = "../orph.svg"
    orph.className = "orph"
    orph.draggable = false;
    orph.addEventListener("click", () => {
        location.href = "https://hackclub.com"
    })
    document.body.appendChild(orph);
})
