import { writable } from 'svelte/store';
export const UvaPath = writable("");

if (typeof document !== "undefined") {
    const uvaScript = document.querySelectorAll(`[data-uva-id]`);
    if (uvaScript.length > 0) {
        const id = uvaScript[0].getAttribute(`data-uva-id`);
        let path = "";
        if (id.length === 12) {
            path = IDReportagemUvaPages1(id);
        } else {
            path = IDReportagemUvaPages2(id) + "/";
        }
        UvaPath.set(path);
    }
}

function IDReportagemUvaPages1(id) {
    return id.replace(/.{2}/g, `$&/`);
}

function IDReportagemUvaPages2(id) {
    return id;
}