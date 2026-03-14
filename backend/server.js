import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>KFC Backend is properly running!</h1><p>Visit <b>/api/products</b> to see data.</p>');
});

// Routes
app.get('/api/products', async (req, res) => {
    try {
        const data = await fs.readFile(path.join(__dirname, 'data', 'products.json'), 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.post('/api/orders', (req, res) => {
    const { items, total } = req.body;
    console.log('Order received:', { items, total });
    res.status(201).json({ message: 'Order placed successfully!', orderId: Math.floor(Math.random() * 1000000) });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'KFC Backend is running' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
