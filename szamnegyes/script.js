function solve() {
    const table = [
        [
            +c00.value, +c01.value, +c02.value
        ],
        [
            +c10.value, +c11.value, +c12.value
        ],
        [
            +c20.value, +c21.value, +c22.value
        ]
    ];

    const a = table[0][0];
    const b = table[0][2];
    const c = table[2][0];
    const d = table[2][2];

    const valid =
        table[0][1] === a + b &&
        table[1][0] === a + c &&
        table[1][2] === b + d &&
        table[2][1] === c + d &&
        table[1][1] === a + b + c + d;

    const resultDiv = document.getElementById("result");

    if (!valid) {
        resultDiv.textContent = "[-1] (Csalás történt)";
        resultDiv.className = "alert alert-danger mt-3 text-center";
    } else {
        resultDiv.textContent = `[${a}, ${b}, ${c}, ${d}]`;
        resultDiv.className = "alert alert-success mt-3 text-center";
    }
}
