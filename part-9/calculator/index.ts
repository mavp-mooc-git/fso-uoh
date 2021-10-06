import express from 'express';
import { Request } from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  try {
    if (height === 0 || weight === 0) throw new Error('missing parameters');
    if (isNaN(Number(height)) || isNaN(Number(weight))) throw new Error('malformatted parameters');
    res.send({
      weight,
      height,
      bmi: calculateBmi(height, weight)
    });
  } catch(e: unknown) {
    if (e instanceof Error) {
      res.status(400);
      res.send({
        error: e.message
      });
    }
  }
});

type reqBody = {
  daily_exercises: Array<number>,
  target: number
};

app.post('/exercises', (req: Request<unknown, unknown, reqBody>, res) => {
  const {daily_exercises, target} = req.body;

  try {
    if (!target || !daily_exercises) throw new Error('missing parameters');
    if (isNaN(target) || daily_exercises.find(n => isNaN(n) )) throw new Error('malformatted parameters');
    res.send(calculateExercises(target, daily_exercises));
  } catch(e: unknown) {
    if (e instanceof Error) {
      res.status(400);
      res.send({
        error: e.message
      });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
