items = document.querySelectorAll(".selector-item")

items.forEach(item => {
    item.addEventListener("click", () => {
        let isSelected = item.className.includes("selected")
        if (isSelected) {
            item.classList.remove("selected")
        } else {
            if (getSelectedItems().length < 3) {
                item.classList.add("selected")
            }
        }
        recalculateSelected();
    })
});
function getSelectedItems() {
    return document.querySelectorAll(".selected")
}
function recalculateSelected() {
    let numSelectedItems = getSelectedItems().length
    let selections = []
    document.querySelector(".selector-number").innerText = `${3 - numSelectedItems} choices remaining.`
    if (3 - numSelectedItems == 0) {
        items.forEach(item => {
            let isSelected = item.className.includes("selected")
            if (!isSelected) {
                item.classList.add("disabled")
            }
        })
    } else {
        items.forEach(item => {
            let isDisabled = item.className.includes("disabled")
            if (isDisabled) {
                item.classList.remove("disabled")
            }
        })
    }
    getSelectedItems().forEach(item => {
        selections.push(item.getAttribute("part_name"))
    })
    console.log(selections)
    return numSelectedItems
}


recalculateSelected();