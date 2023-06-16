const parseError = (validationErrorsString) => {

    // Remove the leading and trailing double quotes from the string
    const cleanedString = validationErrorsString.slice(1, -1);
    
    // Split the cleaned string into an array of individual error messages
    const errorMessagesArray = cleanedString.split('. ');
    
    // Create an empty object to store the parsed errors
    const validationErrors = {};
    
    // Loop through the error messages array and extract the key-value pairs
    errorMessagesArray.forEach((errorMessage) => {
      const [key, value] = errorMessage.split(' is required');
      validationErrors[key] = value.trim();
    });
    

    return validationErrors;
}

module.exports.parseError = parseError;