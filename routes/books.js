const express = require('express');
const router = express.Router();
const Book = require('../models').Book;


/* Handler function to wrap each route. */
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next)
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

/* GET Books listing. */
router.get('/', asyncHandler(async (req, res) => {
  const allBooks = await Book.findAll({})
  res.render("books/index", {
    Books:allBooks,
    title: "Books"
  });
}));

/* Create a new Book form. */
router.get('/new', (req, res) => {
  res.render("books/new", {
    Book: {},
    title: "New Book!"
  });
});

/* POST create Book. */
router.post('/new', asyncHandler(async (req, res) => {
  let book;
  try {
  const book = await Book.create(req.body);
  res.redirect("/books/" + book.id);
  } catch (error) {
    if (error.name === "SequelizeValidationError") { // checking the error
      article = await Book.build(req.body);
      res.render("articles/new", {
        article,
        errors: error.errors,
        title: "New Book"
      })
    } else {
      throw error; // error caught in the asyncHandler's catch block
    }
  }

}));


/* GET individual Book. */
router.get("/:id", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
    console.log(book);
  res.render("Books/show", { 
    book,
    title: book.title });
}));

/* Edit Book form. */
router.get("/:id/edit", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render("Books/edit", {
    book,
    title: "Edit Book"
  });
}));

/* Update an Book. */
router.post('/:id/edit', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.update(req.body)
  res.redirect("/Books/"+ book.id);
}));

/* Delete Book form. */
router.get("/:id/delete", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render("Books/", {
    book,
    title: "Delete Book"
  });
}));

/* Delete individual Book. */
router.post('/:id/delete', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect("/Books");
}));

module.exports = router;
