export function alturaDaTela () {
    if (typeof window === "undefined") {
        return null
    } else {
    let vh = window.innerHeight * 1;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
}