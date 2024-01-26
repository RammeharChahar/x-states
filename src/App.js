
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [countries,setCountries] = useState([]);
  const [states,setStates] = useState([]);
  const [cities,setCities] = useState([]);
  const [selectedCountry,setSelectedCountry] = useState('');
  const [selectedState,setSelectedState] = useState('');
  const [selectedCity,setSelectedCity] = useState('');

  useEffect(() =>{
   async function getCountries(){
      const res = await axios.get('https://crio-location-selector.onrender.com/countries');
      setCountries(res.data);
   }
   getCountries();
  },[])

  useEffect(() =>{
    if(selectedCountry){
      async function getStates(){
        const res = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
        setStates(res.data);
        setSelectedState('');
        setCities([]);
        setSelectedCity('');
     }
     getStates();
    }
   },[selectedCountry])

   useEffect(() =>{
    if(selectedCountry && selectedState){
      async function getCities(){
        let res;
        try{
          res = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
          setCities(res.data);
          setSelectedCity('');
        }catch(err){
            console.log(err);
        }
     }
     getCities();
    }
   },[selectedState,selectedCountry])


  return (
    <div className="app">
     <h1>Select Location</h1>
     <div className='dropdowns'>
      <select className='dropdown'name='selectCountry' onChange={(e) => setSelectedCountry(e.target.value)}>
        <option >Select Country</option>
        {countries.map((country) =>(
           <option key={country} value={country}>
             {country}
           </option>
        ))}
      </select>
      <select className='dropdown' onChange={(e) => setSelectedState(e.target.value)} disabled={!selectedCountry}>
        <option>Select State</option>
        {states.map((state) => (
           <option key={state} value={state}>
            {state}
           </option>
        ))}
      </select>
      <select className='dropdown' onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedState}>
        <option>Select City</option>
        {cities.map((city) =>(
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
     </div>
     <div>
      {selectedCity ?  <p>You selected <span className='cityName'>{selectedCity},</span> <span className='stateName'>{selectedState}, {selectedCountry}</span></p> : ''}
     </div>
    </div>
  );
}

export default App;
