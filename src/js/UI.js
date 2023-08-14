import App from './App';

export default class UI {
  constructor() {
    this.app = new App();
  }

  loadHomepage() {
    this.initLocation();
    this.initSearch();
  }

  async searchCity(city) {
    let input;
    try {
      !city
        ? (input = document.getElementById('cityInput').value)
        : (input = city);

      if (!input) {
        this.showErrorMsg();
        return;
      }

      this.hideAlertMsg();
      this.clearForecast();

      const processedData = await this.app.processData(input);

      this.displayCurrentDay(
        processedData.city,
        processedData.country,
        processedData.condition,
        processedData.conditionIcon,
        processedData.degree,
        processedData.color
      );

      processedData.forecast.forEach(day => {
        this.displayForecast(
          day.date,
          day.maxC,
          day.minC,
          day.conditionIcon,
          day.color
        );
      });
    } catch (err) {
      this.showErrorMsg('name');
    }
  }

  searchEvent() {
    this.searchCity();
  }

  displayCurrentDay(city, country, condition, icon, degree, color) {
    const container = document.getElementById('currentDay');
    const html = `
      <div class="flex flex-col justify-center items-center gap-4">
        <p class="text-4xl sm:text-4xl md:text-5xl lg:text-5xl font-normal">
          ${city}<span class="font-light text-lg sm:text-xl md:text-2xl lg:text-3xl">, ${country}</span>
        </p>
        <p class="text-base md:text-lg lg:text-xl">${condition}</p>
      </div>
      <img src="${icon}" class="w-36 md:w-38"></img>
      <div class="font-light text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">${degree}<span class"font-thin">&#8451;</span></div>
    `;
    container.classList.add(color);
    container.innerHTML = html;
  }

  displayForecast(date, maxC, minC, icon, color) {
    const html = `
      <div class="flex justify-between gap-5 lg:flex-col lg:justify-between items-center ${color} p-5 border-b-2 border-white last:border-b-0 lg:border-b-0 lg:border-r-2 last:border-r-0">
        <div class="font-normal lg:text-2xl xl:text-3xl">${date}</div>
        <img src="${icon}" class="w-14 md:w-24"></img>
        <p class="font-normal whitespace-nowrap lg:text-2xl  xl:text-3xl">
          ${maxC}<span class"font-thin">&#8451;</span><span class="font-light text-base lg:text-lg xl:text-xl"> / ${minC}<span class"font-thin">&#8451;</span></span>
        </p>
      </div>
    `;

    document.getElementById('weeklyForecast').innerHTML += html;
  }

  initLocation() {
    const location = navigator.geolocation.getCurrentPosition(position => {
      this.searchCity(
        `${position.coords.latitude},${position.coords.longitude}`
      );
    });
  }

  clearForecast() {
    document.getElementById('weeklyForecast').innerHTML = '';
  }

  showErrorMsg(state) {
    const alertMsg = document.getElementById('alertMsg');
    if ((state = 'name'))
      alertMsg.textContent = 'Incorrect city name, please type again.';

    alertMsg.textContent = "* Field can't be empty";
    alertMsg.classList.add('visible');
    alertMsg.classList.add('h-auto');
    alertMsg.classList.add('mt-2');
    alertMsg.classList.remove('collapse');
  }
  hideAlertMsg() {
    const alertMsg = document.getElementById('alertMsg');

    alertMsg.classList.remove('h-auto');
    alertMsg.classList.remove('mt-2');
    alertMsg.classList.remove('visible');
    alertMsg.classList.add('collapse');
  }

  // Event listeners
  initSearch() {
    const searchBtn = document.getElementById('citySearch');

    searchBtn.addEventListener('click', this.searchEvent.bind(this));
  }
}
