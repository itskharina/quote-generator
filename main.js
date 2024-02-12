const button = document.querySelector('button');
const advice = document.querySelector('.advice');
const title = document.querySelector('.advice-number');

window.onload = async function () {
  const data = await fetchAdvice();
  renderData(data);
};

async function fetchAdvice() {
  try {
    const response = await fetch('https://api.adviceslip.com/advice');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const advice = await response.json();
    console.log(advice);
    return advice;
  } catch (error) {
    console.error('An error occured:', error);
  }
}

function renderData(data) {
  advice.textContent = `"${data.slip.advice}"`;
  title.textContent = `ADVICE #${data.slip.id}`;
}

button.addEventListener('click', async function () {
  button.disabled = true;
  setTimeout(() => {
    button.disabled = false;
  }, 2000);

  const data = await fetchAdvice();
  renderData(data);
});
