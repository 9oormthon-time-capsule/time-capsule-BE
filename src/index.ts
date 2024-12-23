import express from 'express';
import itemRoutes from './router/routerExample';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Time Capsule!');
});

// 예시 라우터 사용
app.use('/api', itemRoutes);

app.listen(port, () => {
  console.log(`서버 실행 성공! http://localhost:${port}`);
});
