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
    let id = await table.insert(insertObject);
    res.json(id);
});

router.put('/:id', async (req, res) => {
    let body = req.body;
    let id = req.params.id;
    let updateObject = {
        title: body.title,
        content: body.content
    }
    let result = await table.update(id, updateObject);
    res.json(result);
});

router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    let result = await table.delete(id);
    res.json(result);
});

export default router;