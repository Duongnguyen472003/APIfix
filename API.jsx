import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodApiComponent = () => {
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://dietagram.p.rapidapi.com/apiFood.php',
        params: {
          name: 'Apple',
          lang: 'en'
        },
        headers: {
          'X-RapidAPI-Key': 'b9d796f5dcmsh1fed08792e27c92p1402d5jsnbe0a418715cd',
          'X-RapidAPI-Host': 'dietagram.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        console.log('API Response:', response);
        setApiData(response.data);
      } catch (error) {
        console.error('API Request Error:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  const displayData = () => {
    if (error) {
      return <p>Error: {error}</p>;
    }

    if (apiData) {
      return (
        <div>
          <p>Name: {apiData.name}</p>
          {/* Display other data properties as needed */}
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <h2>API Data</h2>
      {displayData()}
    </div>
  );
};

export default FoodApiComponent;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const FoodList = () => {
//   const [foodList, setFoodList] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const options = {
//         method: 'GET',
//         url: 'https://dietagram.p.rapidapi.com/apiFood.php',
//         params: {
//           lang: 'en' // Change the language to English
//         },
//         headers: {
//           'X-RapidAPI-Key': '901060d89fmsha223b879571e886p177850jsn48cdc00b964e',
//           'X-RapidAPI-Host': 'dietagram.p.rapidapi.com'
//         }
//       };

//       try {
//         const response = await axios.request(options);
//         console.log('API Response:', response);
//         setFoodList(response.data);
//       } catch (error) {
//         console.error('API Request Error:', error);
//         setError(error.message);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array means this effect runs once after the initial render

//   const displayFoodList = () => {
//     if (error) {
//       return <p>Error: {error}</p>;
//     }

//     if (foodList.length > 0) {
//       return (
//         <div>
//           <h2>Food List</h2>
//           <ul>
//             {foodList.map((food, index) => (
//               <li key={index}>{food.name}</li>
//               // You can display other properties of each food as needed
//             ))}
//           </ul>
//         </div>
//       );
//     }

//     return <p>No food data available.</p>;
//   };

//   return (
//     <div>
//       {displayFoodList()}
//     </div>
//   );
// };

// export default FoodList;
