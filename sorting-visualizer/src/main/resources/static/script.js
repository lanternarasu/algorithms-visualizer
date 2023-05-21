let array = [];

function generateArray() {
  const arrayContainer = document.querySelector('.array-container');
  arrayContainer.innerHTML = '';
  fetch('http://localhost:8085/api/sorting/random')
    .then(response => response.json())
    .then(data => {
      array = data;
      for (let i = 0; i < array.length; i++) {
        const arrayBar = document.createElement('div');
        arrayBar.className = 'array-bar';
        arrayBar.style.height = `${array[i]}px`;
        arrayContainer.appendChild(arrayBar);
      }
    });
}
function generate()
{
	const arrayContainer = document.querySelector('.array-container');
  arrayContainer.innerHTML = '';
  fetch('http://localhost:8085/api/sorting/default')
    .then(response => response.json())
    .then(data => {
      array = data;
      for (let i = 0; i < array.length; i++) {
        const arrayBar = document.createElement('div');
        arrayBar.className = 'array-bar';
        arrayBar.style.height = `${array[i]}px`;
        arrayContainer.appendChild(arrayBar);
      }
    });
}

async function bubbleSort() {
  const arrayBars = document.querySelectorAll('.array-bar');
  let sorted = false;
  while (!sorted) {
    sorted = true;
    for (let i = 0; i < array.length - 1; i++) {
      const currentBar = arrayBars[i];
      const nextBar = arrayBars[i + 1];
      currentBar.style.backgroundColor = 'red';
      nextBar.style.backgroundColor = 'red';
      await new Promise(resolve => setTimeout(resolve, 50));
      if (array[i] > array[i + 1]) {
        sorted = false;
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        currentBar.style.height = `${array[i]}px`;
        nextBar.style.height = `${array[i + 1]}px`;
      }
      currentBar.style.backgroundColor = '#007bff';
      nextBar.style.backgroundColor = '#007bff';
    }
  }
}

async function quickSort() {
  const arrayBars = document.querySelectorAll('.array-bar');
  await animateSorting(array, arrayBars); // Animate initial state

  async function animateSorting(array, arrayBars) {
    if (array.length <= 1) {
      return array;
    }

    const pivotIndex = Math.floor(array.length / 2);
    const pivot = array[pivotIndex];
    const left = [];
    const right = [];

    for (let i = 0; i < array.length; i++) {
      if (i === pivotIndex) continue;
      if (array[i] < pivot) {
        left.push(array[i]);
      } else {
        right.push(array[i]);
      }
    }

    const sortedArray = [
      ...await animateSorting(left, arrayBars),
      pivot,
      ...await animateSorting(right, arrayBars)
    ];

    for (let i = 0; i < sortedArray.length; i++) {
      array[i] = sortedArray[i];
      arrayBars[i].style.height = `${sortedArray[i]}px`;
      arrayBars[i].style.backgroundColor = 'green';
      await new Promise(resolve => setTimeout(resolve, 50));
      arrayBars[i].style.backgroundColor = '#007bff';
    }

    return sortedArray;
  }

  await animateSorting(array, arrayBars); // Animate final state
}
