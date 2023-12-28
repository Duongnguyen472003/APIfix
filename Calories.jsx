import React, { useState } from 'react';
//import axios from 'axios';
import '../App.css';
import CaloriesPopUp from './CaloriesPopUp';

function Popup({ closePopup, adjustCalories }) {
  return (
    <div className="popup">
      <h3>Adjust Calories</h3>
      <button onClick={() => adjustCalories(1.1)}>Gain Weight</button>
      <button onClick={() => adjustCalories(1)}>Maintain Weight</button>
      <button onClick={() => adjustCalories(0.9)}>Lose Weight</button>
      <button onClick={closePopup}>Close</button>
    </div>
  );
}


function Calories() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [result, setResult] = useState('');
  const [show, setShow] = useState(false);
  const [waterIntake, setWaterIntake] = useState(0);

  const adjustCalories = (factor) => {
    // Logic để điều chỉnh calo dựa trên factor
    console.log(`Adjusting calories with factor: ${factor}`);
  };
  const togglePopup = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  }

  const calculateBMIandBMR = () => {
    if (weight && height && age && gender && activityLevel) {
      // Calculate BMI
      const bmi = weight / ((height / 100) ** 2);

      // Calculate BMR
      let bmr;
      if (gender === 'male') {
        bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
      } else if (gender === 'female') {
        bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
      }

      // Calculate TDEE
      let tdee;
      switch (activityLevel) {
        case 'sedentary':
          tdee = bmr * 1.2;
          break;
        case 'lightlyActive':
          tdee = bmr * 1.375;
          break;
        case 'moderatelyActive':
          tdee = bmr * 1.55;
          break;
        case 'veryActive':
          tdee = bmr * 1.725;
          break;
        case 'extraActive':
          tdee = bmr * 1.9;
          break;
        default:
          break;
      }

      setResult(`Your TDEE is: ${tdee.toFixed(2)} calories/day`);

      const waterIntake = Math.round((weight * 0.03) * 100) / 100;
      setWaterIntake(waterIntake);
    } else {
      alert('Please enter all the required information.');
    }
  };

  return (
    <div className="calculator-container">
      <h2>Calories needed Calculator</h2>
      <div>
        <label htmlFor="weight">Weight (kg):</label>
        <input
          type="number"
          id="weight"
          placeholder="Enter your weight in kilograms"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="height">Height (cm):</label>
        <input
          type="number"
          id="height"
          placeholder="Enter your height in centimeters"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          placeholder="Enter your age in years"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <label htmlFor="activityLevel">Activity Level:</label>
        <select
          id="activityLevel"
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value)}
        >
          <option value="sedentary">Sedentary (little or no exercise)</option>
          <option value="lightlyActive">Lightly Active (light exercise/sports 1-3 days/week)</option>
          <option value="moderatelyActive">Moderately Active (moderate exercise/sports 3-5 days/week)</option>
          <option value="veryActive">Very Active (hard exercise/sports 6-7 days a week)</option>
          <option value="extraActive">Extra Active (very hard exercise/sports & physical job or 2x training)</option>
        </select>
      </div>
      <button onClick={calculateBMIandBMR}>Result</button>
      <button onClick={togglePopup}>Set your goal</button>
      <CaloriesPopUp
        show={show}
        handleClose={handleClose}
        calculateBMIandBMR={calculateBMIandBMR}  // Truyền hàm calculateBMIandBMR vào prop
        gender={gender}
        activityLevel={activityLevel}
        adjustCalories={adjustCalories}
      />
      <div id="result">{result}</div>
    
      {waterIntake > 0 && (
        <p>Your daily water intake is {waterIntake} liters.</p>
      )}
    </div>
  );
}

export default Calories;
