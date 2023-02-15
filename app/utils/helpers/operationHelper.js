/* eslint-disable operator-linebreak */

const hasDecimalValues = (value) => {
  if (typeof value === "number") {
    return value % 1 !== 0;
  }
  return false;
};

exports.getOperationResult = (type, valueOne, valueTwo) => {
  let result = 0;

  const firstNumb =
    typeof valueOne === typeof "number" ? valueOne : parseInt(valueOne, 10);
  const secondNumb =
    typeof valueTwo === typeof "number" ? valueTwo : parseInt(valueTwo, 10);

  switch (type) {
    case "addition":
      result = firstNumb + secondNumb;
      break;

    case "substraction":
      result = firstNumb - secondNumb;
      break;

    case "multiplication":
      result = firstNumb * secondNumb;
      break;

    case "division":
      result = firstNumb / secondNumb;
      break;

    case "square-root":
      result = Math.sqrt(secondNumb);
      break;

    case "random-string":
      console.log("call third API");
      break;

    default:
      break;
  }
  return hasDecimalValues(result) ? result.toFixed(2) : result;
};
