export function readFromLS(key) {
    let ls = JSON.parse(localStorage.getItem(key));
    return ls;
}

export function writeToLS(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}