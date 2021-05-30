window.onload = function() {
    const links = [
        { label: "Week1 notes/exercises", url: "week01/index.html" },
        { label: "Week2 notes/exercises", url: "week02/index.html" },
        { label: "week3 notes/exercises", url: "week03/index.html" },
        { label: "week4 notes/exercises", url: "week04/index.html" },
        { label: "week5 notes/exercises", url: "week05/index.html" },
        { label: "week6 Todo application", url: "week06/index.html"}
    ]

    addLink(links);
}

function addLink(links) {
    const ol = document.getElementById("week-links");

    for (let i = 0; i < links.length; i++) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.innerHTML = links[i].label;
        a.href = links[i].url;
        li.appendChild(a);
        ol.appendChild(li);
    }
}