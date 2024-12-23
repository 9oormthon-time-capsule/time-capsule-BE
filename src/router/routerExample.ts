import { Router } from 'express';
import { addItem, getItems } from '../firebase/firebaseExample';

const router = Router();

// 아이템 추가 엔드 포인트
router.post('/add-item', async (req, res) => {
  const { name, description } = req.body;

  try {
    const itemId = await addItem(name, description);
    res.status(201).send(`아이템이 추가되었습니다. ID: ${itemId}`);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// 아이템 조회 엔드 포인트
router.get('/items', async (req, res) => {
  try {
    const items = await getItems();
    res.status(200).json(items);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;
