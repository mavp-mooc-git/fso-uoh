interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (days: number, data: Array<number>): Result => {
  let trainingDays = 0;
  data.filter(n => (n > 0) ? trainingDays += 1 : trainingDays += 0 );
  const average = data.reduce((p, c) => p + c) / data.length;
  let rating = 3;

  let ratingDescription = '';
  if(average < days*0.5) {
    rating = 1;
    ratingDescription = 'too bad, should be improve more';
  } else if(average < days) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }
  else ratingDescription = 'very good, target raised';

  const result = {
    periodLength: data.length,
    trainingDays: trainingDays,
    success: (average >= days),
    rating: rating,
    ratingDescription: ratingDescription,
    target: days,
    average: average
  };
  return result;
};

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

try {
  interface Values {
    t: number;
    data: Array<number>;
  }

  const parseArguments = (args: Array<string>): Values => {
    if (args.length < 6) throw new Error('Not enough arguments');
    if (args.length > 24) throw new Error('Too many arguments');

    const [,,t, ...data] = [...args]

    if (!isNaN(Number(t)) && !isNaN(Number(...data))) {
      return {
        t: Number(args[2]),
        data: data.map(n => Number(n))
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

  const { t, data } = parseArguments(process.argv);
  console.log(calculateExercises(t, data));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
