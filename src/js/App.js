export default class App {
  fetchData = async city => {
    const forecast = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=792bd8a022954066b5f200041231308&q=${city}&days=7`,
      {
        mode: 'cors',
      }
    );
    const dataForecast = await forecast.json();
    return dataForecast;
  };

  processData(city) {
    return this.fetchData(city).then(data => {
      let forecast = [];
      const city = data.location.name;
      const country = data.location.country;
      const condition = data.current.condition.text;
      const conditionIcon = data.current.condition.icon;
      const degree = data.current.temp_c.toString();
      const color = this.weatherColor(degree);

      data.forecast.forecastday.forEach(days => {
        const [_, month, dayz] = days.date.split('-');
        const date = `${dayz}.${month}`;
        const maxC = days.day.maxtemp_c;
        const minC = days.day.mintemp_c;
        const conditionIcon = days.day.condition.icon;
        const color = this.weatherColor(days.day.avgtemp_c);

        const day = {
          date: date,
          maxC: maxC,
          minC: minC,
          conditionIcon: conditionIcon,
          color: color,
        };

        forecast.push(day);
      });

      return {
        city: city,
        country: country,
        condition: condition,
        conditionIcon: conditionIcon,
        degree: degree,
        color: color,
        forecast: forecast,
      };
    });
  }

  weatherColor(temp) {
    const temperatureRanges = [
      { min: 30, prop: 'bg-custom-1' },
      { min: 25, prop: 'bg-custom-2' },
      { min: 20, prop: 'bg-custom-3' },
      { min: 15, prop: 'bg-custom-4' },
      { min: 10, prop: 'bg-custom-5' },
      { min: 5, prop: 'bg-custom-6' },
      { min: 0, prop: 'bg-custom-7' },
      { min: -5, prop: 'bg-custom-8' },
      { min: -10, prop: 'bg-custom-9' },
      { min: -15, prop: 'bg-custom-10' },
      { min: -Infinity, prop: 'bg-custom-11' },
    ];

    for (const range of temperatureRanges) {
      if (temp >= range.min) {
        return range.prop;
      }
    }
  }
}
