export function qs(selector) {
    const element = document.getElementById(selector);
    return element;
}

export function onTouch(elementSelector, callback) {
    const element = qs(elementSelector);
    element.addEventListener('touchend', function(e) {
        e.currentTarget.click();
    }, false);
}