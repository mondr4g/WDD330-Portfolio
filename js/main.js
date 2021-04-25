window.onload = function() {
    const links = [
        {
            label: "Week1 notes/exercises",
            url: "week01/index.html" 
        }
    ]

    addLink(links);
}

function addLink(links) {
    const ol = document.getElementById("week-links");
    let li = document.createElement('li');
    let a = document.createElement('a');

    for (let i = 0; i < links.length; i++) {
        a.innerHTML = links[i].label;
        a.href = links[i].url;
        li.appendChild(a);
        ol.appendChild(li);
    }
}