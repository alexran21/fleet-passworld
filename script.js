// Assignment code here

function generatePassword() {
    var charTypes = {
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      numeric: "0123456789",
      special: "!@#$%&*()-_.?+="
    };
  
    var chars = "";
  
    var validTypes = Object.keys(charTypes);
  
    // prompt for password length between 8-128 characters
    var passwordLength;
  
    while (!passwordLength || passwordLength < 8 || passwordLength > 128) {
      passwordLength = window.prompt("Please choose your password length between 8 and 128 characters");
      passwordLength = parseInt(passwordLength);
    }
  
    // prompt for character types including lowercase, uppercase, numeric, and/or special characters
    // validate input and at least one character type should be selected
    // make array to store selected char types, create while loop and while that array is empty keep asking for char types
    // once a user has selected a char type an empty value should terminate the loop
    var selectedTypes = [];
    var charType;
  
    while (selectedTypes.length === 0 || charType) {
      charType = window.prompt("Please choose a character type. Select cancel when done. Valid types: " + validTypes.join(', '));
  
      if (charType === null) {
        continue;
      }
  
      charType = charType.toLowerCase();
      // verify that charType is valid
      if (charTypes.hasOwnProperty(charType)) {
        // if a new charType is entered include those characters
        if (selectedTypes.indexOf(charType) === -1) {
          selectedTypes.push(charType);
          chars += charTypes[charType];
        } else {
          window.alert("You've already selected " + charType + ".");
        }
      }
    }
  
    while (true) {
      // create variable to store charTypes used
      var typesUsed = [];
  
      // create variable to hold generated password
      var genPassword = "";
  
      // create a for loop which runs "passwordLength"
      for (var i = 0; i < passwordLength; i++) {
        // each iteration, select a random character from "chars"
        var index = Math.floor(Math.random() * (chars.length - 1));
  
        // create variable for store selected char (refactor "genPassword += ..." to use this variable)
        var char = chars[index];
  
        // add selected character onto password variable
        genPassword += char;
  
        // loop through selectedTypes for validation
        for (var k = 0; k < selectedTypes.length; k++) {
          var type = selectedTypes[k];
          var typeChars = charTypes[type];
          
          // determine character type of selected character
          if (typeChars.indexOf(char) >= 0) {
            typesUsed.push(type);
            break;
          }
        }
      }
  
      var isValid = true;
  
      // verify each selected type is used once
      for (var l = 0; l < selectedTypes.length; l++) {
        // if type is not found in typesUsed generate new password
        if (typesUsed.indexOf(selectedTypes[l]) === -1) {
          isValid = false;
          break;
        }
      }
      
      // if password passes validation return password
      if (isValid) {
        return genPassword;
      }
    }
  }
  
  
  // Get references to the #generate element
  var generateBtn = document.querySelector("#generate");
  
  // Write password to the #password input
  function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");
  
    passwordText.value = password;
  
  }
  
  // Add event listener to generate button
  generateBtn.addEventListener("click", writePassword);