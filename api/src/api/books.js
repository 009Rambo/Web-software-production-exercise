const express = require('express');
const router = express.Router();

let books = [
    {
    id: 1,
    name: 'Parijat',
    },
    {
    id: 2,
    name: 'Setodharti',
    },
    {
    id: 3,
    name: 'Radha',
    },
];

router.get('/', (req, res) => {
  res.status(200).json(books);
});


router.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    const book = books.find((m) => m.id === Number(id));
    
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ message: 'Not found' });
    }
  });


router.post('/', (req, res) => {
    const { id, name } = req.body;
    books.push({ id, name });
    res.status(201).json({ message: 'Created' });
  });


router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const index = books.findIndex((m) => m.id === Number(id));
    const updatedBook = {
      id: Number(id),
      name,
    };
    books[index] = updatedBook;
    res.status(200).json({ message: 'Updated' });
  });


router.delete('/:id', (req, res) => {
    const { id } = req.params;

    books = books.filter((b) => {
        return b.id !== Number(id)
    });
    res.status(200).json({ message: 'Deleted' });
});
  

module.exports = router;