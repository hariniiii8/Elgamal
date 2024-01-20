// Define modExp function
function modExp(base, exp, mod) {
    let result = 1;
    base = base % mod;
    while (exp > 0) {
        if (exp % 2 === 1) {
            result = (result * base) % mod;
        }
        exp = Math.floor(exp / 2);
        base = (base * base) % mod;
    }
    return result;
}

// Define modInverse function
function extendedGcd(a, b) {
    if (a === 0) {
        return [b, 0, 1];
    } else {
        const [g, x, y] = extendedGcd(b % a, a);
        return [g, y - Math.floor(b / a) * x, x];
    }
}

// Define modInverse function
function modInverse(a, m) {
    const [g, x] = extendedGcd(a, m);
    if (g !== 1) {
        throw new Error('Modular inverse does not exist');
    } else {
        return (x % m + m) % m; // Ensure positive result
    }
}

// Define encrypt function
function encrypt() {
    const plaintextInput = document.getElementById("plaintext");
    const plaintext = parseInt(plaintextInput.value);

    const p = 1451;
    const d = 1423;
    const e1 = modExp(2, d, p);
    const e2 = modExp(e1, d, p);

    const r = Math.floor(Math.random() * (10 - 2 + 1)) + 2;

    const c1 = modExp(e1, r, p);
    const c2 = (modExp(e2, r, p) * plaintext) % p;

    const s = modExp(c1, d, p);
    const sInv = modInverse(s, p);

    const decryptedPlaintext = (c2 * sInv) % p;

    const encryptedResult = `Encrypted Ciphertext (c1, c2): ${c1}, ${c2}`;
    const decryptedResult = `Decrypted Plaintext: ${decryptedPlaintext}`;

    document.getElementById("encryptedResult").textContent = encryptedResult;
    document.getElementById("decryptedResult").textContent = decryptedResult;
}
