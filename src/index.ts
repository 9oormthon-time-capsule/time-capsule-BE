import express from 'express';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Time Capsule!');
});

app.listen(port, () => {
  console.log(`서버 실행 성공! http://localhost:${port}`);
});
