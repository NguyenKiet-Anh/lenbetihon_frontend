const fetchDataFromDjango_Data_Category = async () => {
  try {
    const response = await fetch('https://lenbetihon-backend.onrender.com/getfish/');  // Adjust the URL based on your Django project structure
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};
export default fetchDataFromDjango_Data_Category;
