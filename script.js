//your JS code here. If required.
const output = document.getElementById("output");
const loadingRow = document.getElementById("loading");

// Function to create a promise that resolves after a random time between 1 and 3 seconds
function createPromise(name) {
  return new Promise((resolve) => {
    const time = (Math.random() * 2 + 1).toFixed(3); // random time between 1 and 3 seconds
    setTimeout(() => resolve({ name, time: parseFloat(time) }), time * 1000);
  });
}

// Create an array of 3 promises
const promises = [
  createPromise("Promise 1"),
  createPromise("Promise 2"),
  createPromise("Promise 3"),
];

// Record the start time
const startTime = performance.now();

Promise.all(promises)
  .then((results) => {
    // Calculate total time taken for all promises
    const totalTime = (performance.now() - startTime) / 1000;

    // Remove the loading row
    output.innerHTML = "";

    // Populate the table with promise results
    results.forEach((result, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${result.name}</td><td>${result.time}</td>`;
      output.appendChild(row);
    });

    // Add the total time row
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `<td>Total</td><td>${totalTime.toFixed(3)}</td>`;
    output.appendChild(totalRow);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
