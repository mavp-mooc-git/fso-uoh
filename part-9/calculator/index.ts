import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
