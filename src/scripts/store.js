import { writable } from 'svelte/store';
const id = 'rmjox230v234';
function IDReportagem(id) {
    return id.replace(/.{2}/g, `$&/`)
}
const path = IDReportagem(id);
export const UvaPath = writable(path);