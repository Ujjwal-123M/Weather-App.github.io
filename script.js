let weather={
    "apiKey": "7a4ca60348fe6e362a2e8829ec716679",
    fetchWeather:function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
        + city
        + "%20&units=metric&appid="
        + this.apiKey)

        .then((response)=>response.json())
        .then((data)=>this.displayWeather(data));
      
    },
   displayWeather:function(data){
    const {name} = data;
    const {icon,description}=data.weather[0];
    const{temp,feels_like,pressure,humidity}=data.main;
    const {speed}=data.wind;
    const visibility = data.visibility;
    const {sunrise,sunset}=data.sys;
    document.querySelector(".city").innerText="Weather in "+ name;
    document.querySelector(".icon").src="https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText=description;
    document.querySelector(".temp").innerText=temp+" °C";
    document.querySelector(".feels_like").innerText=" Real Feels : "+feels_like+" °C";
    document.querySelector(".pressure").innerText="Pressure: " +pressure+"mb";
    document.querySelector(".humidity").innerText="Humidity: " +humidity+" %";
    document.querySelector(".wind").innerText="Wind Gusts: " +speed+" km/h";
   
    //  Time Formatter 
    const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedHours = (hours % 12 === 0) ? 12 : hours % 12;
  const formattedMinutes = (minutes < 10) ? '0' + minutes : minutes;
  const meridiem = (hours >= 12) ? 'PM' : 'AM';

  return `${formattedHours}:${formattedMinutes} ${meridiem}`;
};

    
    // console.log(formatTime(sunrise));
    // console.log(formatTime(sunset));
    
    document.querySelector(".sunrise").innerText="Sun Rise: " +formatTime(sunrise);
    document.querySelector(".sunset").innerText="Sun Set: " +formatTime(sunset);
    const visibilityKm = (visibility / 1000).toFixed(1)
    document.querySelector(".visibility").innerText="Visibility: " +visibilityKm+" Km";

    
   document.querySelector(".weather").classList.remove("loading");
   document.body.style.backgroundImage="url('https://source.unsplash.com/1600x900/?" + name+ "')";
},
search :function(){
this.fetchWeather(document.querySelector(".search-bar").value);
}
};

document.querySelector(".search button").addEventListener("click",function(){
weather.search();
});
document.querySelector(".search-bar").addEventListener("keyup",function(event){
if(event.key=="Enter"){
    weather.search();
}
}); 

// Default City 
weather.fetchWeather("Thanesar");