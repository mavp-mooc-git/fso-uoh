interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (data: Array<number>, days: number): Result => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
