async function sha256Bytes(str) {
    const buffer = new TextEncoder('utf-8').encode(str);
    return new Uint8Array(await crypto.subtle.digest('SHA-256', buffer));
}

async function* genBytes(phrase1, phrase2) {
    for (let index = 0;; index += 1) {
        const hash = await sha256Bytes(JSON.stringify([phrase1, phrase2, index]));
        for(let byte of hash)
            yield byte;
    }
}

function getRandomValues(n) {
    const array = new Uint8Array(n);
    window.crypto.getRandomValues(array);
    return array;
}

function arrayToHex(arr) {
    function byteToHex(byte) {
        return (byte < 16 ? '0' : '') + byte.toString(16);
    }
    return [...arr].map(byteToHex).join('');
}

async function sha256String(content) {
    return arrayToHex(await sha256Bytes(content));
}