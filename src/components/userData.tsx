const getDataFromLocalStorage = () => {
  //get localstorage function
  try {
    const storedData = localStorage.getItem("user_data");
    if (storedData) {
      return JSON.parse(storedData);
    }
  } catch (error) {
    // Handle any errors that might occur during parsing
    console.error("Error retrieving data from localStorage:", error);
  }

  return null;
};
export default getDataFromLocalStorage;
