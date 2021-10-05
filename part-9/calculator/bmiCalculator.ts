const calculateBmi = (h: number, w: number) => {
  if (h === 0) return 'h parameter should be greater than zero!';
  const bmi = w / ((h/100)**2);
  let result = '';

  switch (true) {
    case (bmi < 16):
      result = 'Underweight (Severe thinness)';
      break;
    case (bmi >= 16 && bmi <= 16.9):
      result = 'Underweight (Moderate thinness)';
      break;
    case (bmi >= 17 && bmi <= 18.4):
      result = 'Underweight (Mild thinness)';
      break;
    case (bmi >= 18.5 && bmi <= 24.9):
      result = 'Normal (healthy weight)';
      break;
    case (bmi >= 25 && bmi <= 29.9):
      result = 'Overweight (Pre-obese)';
      break;
    case (bmi >= 30 && bmi <= 34.9):
      result = 'Obese (Class I)';
      break;
    case (bmi >= 35 && bmi <= 39.9):
      result = 'Obese (Class II)';
      break;
    default:
      result = 'Obese (Class III)';
      break;
  }

  return result;
};

try {
  interface Values {
    h: number;
    w: number;
  }
  
  const parseArguments = (args: Array<string>): Values => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        h: Number(args[2]),
        w: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

  const { h, w } = parseArguments(process.argv);
  console.log(calculateBmi(h, w));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
