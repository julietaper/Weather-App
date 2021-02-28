import React from 'react';

export default class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: props.name,
            APIkey: '6e6373522c4a02da87f6ea52e99abe4f',
        };
        this.getCityInfo = this.getCityInfo.bind(this);
    }

    async componentDidMount() {
        const weatherData = await this.getCityInfo(this.state.city, this.state.APIkey);
        this.updateState(weatherData);
        console.log(weatherData)
    }

    updateState(weatherData) {
        let newState = this.state;
        const celsiusUnicode = '\u2103';
        try {
            newState.temperature = this.toCelsius(weatherData.main.temp);
            newState.temperatureStr = `${this.state.temperature}${celsiusUnicode}`;
            newState.tempFeel = `${this.toCelsius(weatherData.main.feels_like)}${celsiusUnicode}`;
            newState.climateStatus = weatherData.weather[0].description;
            newState.pressure = weatherData.main.pressure;
            newState.humidity = weatherData.main.humidity;
            newState.speed = weatherData.wind.speed;

        } catch (e) {
            console.log(e);
        }
        this.setState(newState);
    }

    toCelsius(temp) {
        let num = temp - 273.15;
        return Math.floor(num);
    }

    async getCityInfo(cityName, APIkey) {
        let info;
        try {
            let rawData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Montevideo&APPID=6e6373522c4a02da87f6ea52e99abe4f
            `);
            info = await rawData.json();
        } catch (e) {
            console.log(e);
        }
        return info;
    }

    render() {
        return <div className='weather-box'>
            <section className='detail-information'>
                <section className='feels-like'>sensacion termica: {this.state.tempFeel}</section>
                <section className='pressure'>presion atmosferica: {this.state.pressure}</section>
                <section className='humidity'>humedad: {this.state.humidity}%</section>
             
            </section>
            <section className='main-information'>
                <section className='climate-value'>Temperatura: {this.state.temperatureStr}</section>
                <section className='climate-status'>{this.state.climateStatus}</section>
                <section className='speed'> viento: {this.state.speed}</section>

                <section className='city-name'>{this.state.city}</section>
            </section>
            
        </div>
    }
}