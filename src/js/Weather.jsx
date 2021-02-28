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
        const celsiusUnicode = '\u00B0';
        try {
            newState.temperature = this.toCelsius(weatherData.main.temp);
            newState.temperatureStr = `${this.state.temperature}${celsiusUnicode}`;
            newState.tempFeel = `${this.toCelsius(weatherData.main.feels_like)}${celsiusUnicode}`;
            newState.climateStatus = weatherData.weather[0].description;
            newState.pressure = weatherData.main.pressure;
            newState.humidity = weatherData.main.humidity;
            newState.speed = weatherData.wind.speed;
            newState.icon =
                `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
            newState.lastRequestTime = this.getTime();
            newState.currentDate = this.getDate();

        } catch (e) {
            console.log(e);
        }
        this.setState(newState);
    }

    getTime() {
        const currentDate = new Date();
        const timeOfDay = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
        return timeOfDay;
    }

    getDate(){
        let meses = new Array ("January","February","March","April","May","June","July","August","September","October","November","December");
        let diasSemana = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
        let f=new Date();
        return(diasSemana[f.getDay()] + ", " + meses[f.getMonth()] + " " + f.getDate()  + ","+ f.getFullYear());
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
   
        return <div className='weatherBox'>


                <seccion className = 'principal'>
                    <section className = 'date'>{this.state.currentDate}</section>
                    <section className='climate-status'>{this.state.climateStatus}</section>
                    <section className='climate-value'>{this.state.temperatureStr}</section>
                    <img src={this.state.icon} alt='weather icon'></img>
                    <section className='request-time'>{this.state.lastRequestTime} hs</section>


                </seccion>

            <section className='detail-information'>
                <section className='fecha'>{this.state.date}</section>
                <section className='feels-like'>Feels like: {this.state.tempFeel}</section>
                <section className='pressure'>Pressure: {this.state.pressure} hPa</section>
                <section className='humidity'>Humidity: {this.state.humidity}%</section>
                <section className='speed'> Wind: {this.state.speed} km/h</section>


                
            </section>
            <section className='main-information'>
                <section className='city-name'>{this.state.city}</section>
            </section>

            
        </div>

    }
}