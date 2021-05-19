var checkbox = document.getElementById("recurring");
function checkRecurring() {

    if (checkbox.checked) {
        document.getElementById('day').disabled = false;
        document.getElementById('time').disabled = false;
    } else {
        document.getElementById('day').disabled = true;
        document.getElementById('time').disabled = true;
    }

}

checkbox.addEventListener('click', checkRecurring);