// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:

//3. Check card numbers:
const validateCred = (arr) => {
  let invert = [];
  for (let i=arr.length-1; i>=0; i--) {
    invert.push(arr[i]);
  }
  for (let i=0; i<invert.length; i++) {
    if (i % 2 == !0) {
      invert[i] *= 2;
      if (invert[i] > 9) {
        invert [i] -= 9;
      }
    }
  }
  let sumInvert = 0;
  for (let i=0; i<invert.length; i++) {
    sumInvert += invert[i];
  }
  return sumInvert % 10 == 0;
}
// Test function:
console.log(validateCred(mystery5));

// 4. Find invalid cards:
findInvalidCards = (arr) => {
  let invalidCards = [];
  for (let i=0; i<arr.length; i++) {
    validateCred(arr[i]) ? invalidCards.push(arr[i]) : false;
  }
  return invalidCards;
}

//Array with invalid cards just for better code readability:
let invalidCards = findInvalidCards(batch);
console.log(invalidCards);

// 5. Identify companies issue faultie numbers:
idInvalidCardCompanies = (arr) => {
  let firstNumbers = [];
  let idInvalidCardCompanies = [];
  for(let i=0; i<arr.length; i++) {
  firstNumbers.push(arr[i][0]);
    }
  for (let i=0; i<firstNumbers.length; i++) {
    switch (firstNumbers[i]) {
      case 3:
      if (idInvalidCardCompanies.indexOf('Amex (American Express)') == -1) {
      idInvalidCardCompanies.push('Amex (American Express)');
      }
      break;
      case 4:
      if (idInvalidCardCompanies.indexOf('Visa') == -1) {
      idInvalidCardCompanies.push('Visa');
      }
      break;
      case 5:
      if (idInvalidCardCompanies.indexOf('Mastercard') == -1) {
      idInvalidCardCompanies.push('Mastercard');
      }
      break;
      case 6:
      if (idInvalidCardCompanies.indexOf('Discover') == -1) {
      idInvalidCardCompanies.push('Discover');
      }
      break;
    }
  }
  return idInvalidCardCompanies;
}
// Test function:
console.log(idInvalidCardCompanies(invalidCards));

// 7. Challenge yourself further:

// Function to convert string into array of numbers:

const toArray = string => {
  let arrayNum = string.split("");
  arrayNum = arrayNum.map(x => parseInt(x));
  return arrayNum;
}
console.log(toArray('4929234068711667'));

// Test different credit numbers from site and generator:

console.log(validateCred(toArray("5528996304516066")));

// Convert invalid numbers into valid numbers:

const toValidCard = (arr) => {
  let invert = [];
  for (let i=arr.length-1; i>=0; i--) {
    invert.push(arr[i]);
  }
  for (let i=0; i<invert.length; i++) {
    if (i % 2 == !0) {
      invert[i] *= 2;
      if (invert[i] > 9) {
        invert [i] -= 9;
      }
    }
  }
  // Sum all numbers except the check number this time:
  let sumInvert = 0;
  for (let i=1; i<invert.length; i++) {
    sumInvert += invert[i];
  }
  let remainder = sumInvert % 10;
  // If reminder = 0 we set new check digit to 0. If reminder !=0 we set new check digit to 10-reminder:
  newNumber = arr;
  if (remainder == 0) {
    newNumber[newNumber.length-1] = 0;
    return newNumber;
  } else {
    switch (remainder) {
      case 1:
      newNumber[newNumber.length-1] = 10-1;
      return newNumber;
      break;
      case 2:
      newNumber[newNumber.length-1] = 10-2;
      return newNumber;
      break;
      case 3:
      newNumber[newNumber.length-1] = 10-3;
      return newNumber;
      break;
      case 4:
      newNumber[newNumber.length-1] = 10-4;
      return newNumber;
      break;
      case 5:
      newNumber[newNumber.length-1] = 10-5;
      return newNumber;
      break;
      case 6:
      newNumber[newNumber.length-1] = 10-6;
      return newNumber;
      break;
      case 7:
      newNumber[newNumber.length-1] = 10-7;
      return newNumber;
      break;
      case 8:
      newNumber[newNumber.length-1] = 10-8;
      return newNumber;
      break;
      case 9:
      newNumber[newNumber.length-1] = 10-9;
      return newNumber;
      break;
    }
  }
}

// We check the fuction works using the invalid card numbers:
newCard = toValidCard(invalid4);
console.log(validateCred(newCard));
