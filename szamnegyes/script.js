document.addEventListener("DOMContentLoaded", () => {
  let A = 0,
    B = 0,
    C = 0,
    D = 0;

  const c00 = document.getElementById("c00");
  const c01 = document.getElementById("c01");
  const c02 = document.getElementById("c02");
  const c10 = document.getElementById("c10");
  const c11 = document.getElementById("c11");
  const c12 = document.getElementById("c12");
  const c20 = document.getElementById("c20");
  const c21 = document.getElementById("c21");
  const c22 = document.getElementById("c22");
  const result = document.getElementById("result");

  function renderTable() {
    c00.value = A;
    c01.value = A + B;
    c02.value = B;

    c10.value = A + C;
    c11.value = A + B + C + D;
    c12.value = B + D;

    c20.value = C;
    c21.value = C + D;
    c22.value = D;
  }

  window.incA = () => {
    A++;
    renderTable();
  };
  window.incB = () => {
    B++;
    renderTable();
  };
  window.incC = () => {
    C++;
    renderTable();
  };
  window.incD = () => {
    D++;
    renderTable();
  };

  window.solve = () => {
    result.textContent = `[${A}, ${B}, ${C}, ${D}]`;
    result.className = "alert alert-success mt-3 text-center";
  };

  renderTable();

  const API = "http://localhost:3000/fours";

  const aInput = document.getElementById("a");
  const bInput = document.getElementById("b");
  const cInput = document.getElementById("c");
  const dInput = document.getElementById("d");

  const addResult = document.getElementById("addResult");
  const foursResult = document.getElementById("foursResult");
  const searchId = document.getElementById("searchId");

  window.addFour = () => {
    const values = [aInput.value, bInput.value, cInput.value, dInput.value];

    if (values.some((v) => v === "")) {
      addResult.innerHTML = `<div class="alert alert-danger">Invalid data</div>`;
      return;
    }

    const numbers = values.map(Number);

    if (numbers.some((n) => n < 0)) {
      addResult.innerHTML = `<div class="alert alert-danger">Invalid data</div>`;
      return;
    }

    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(numbers),
    })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((res) => {
        addResult.innerHTML = `<div class="alert alert-success">Mentve! ID: ${res.id}</div>`;
      })
      .catch(() => {
        addResult.innerHTML = `<div class="alert alert-danger">Invalid data</div>`;
      });
  };

  window.loadAll = () => {
    fetch(API)
      .then((r) => r.json())
      .then((data) => {
        if (data.length === 0) {
          foursResult.textContent = "Nem található adat!";
        } else {
          foursResult.textContent = JSON.stringify(data, null, 2);
        }
      });
  };

  window.loadById = () => {
    const id = searchId.value;
    if (!id) return;

    fetch(`${API}/${id}`)
      .then((r) => {
        if (r.status === 404) throw new Error("notfound");
        return r.json();
      })
      .then((data) => {
        foursResult.textContent = JSON.stringify(data, null, 2);
      })
      .catch((err) => {
        if (err.message === "notfound") {
          foursResult.textContent = "ID nem található!";
        } else {
          foursResult.textContent = "Hiba történt!";
        }
      });
  };
});
