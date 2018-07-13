import { Router } from 'express';
import Table from '../table';

let router = Router();
let table = new Table('blogs');

router.get('/', async (req, res) => {
    let blogs = await table.getAll();
    res.json(blogs);
});

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    let blog = await table.getOne(id);
    res.json(blog);
});

router.post('/', async (req, res) => {
    let body = req.body;
    let insertObject = {
        title: body.title,
        content: body.content
    }
    let id = await table.insert(body);
    res.json(id);
});

export default router;