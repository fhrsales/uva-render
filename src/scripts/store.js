import { writable } from 'svelte/store';

export const UvaPath = writable("");

if (typeof document !== "undefined") {
    const uvaScript = document.querySelectorAll(`[data-uva-id]`);
    if (uvaScript.length > 0) {
        const id = uvaScript[0].getAttribute(`data-uva-id`);
        const path = IDReportagem(id);

        UvaPath.set(path);
    }
}

function IDReportagem(id) {
    return id.replace(/.{2}/g, `$&/`);
}