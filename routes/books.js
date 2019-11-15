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

/* GET ALL Books listing. */
router.get('/', asyncHandler(async (req, res) => {
  const allBooks = await Book.findAll({})
  res.render("books/index", {
    Books:allBooks,
    title: "Books 📚"
  });
}));

//////////////////////////////
/* Create a new Book form. */
router.get('/new', (req, res) => {
  res.render("books/new", {
    Book: {},
    title: "New Book 📘"
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
      book = await Book.build(req.body);
      res.render("books/new", {
        book,
        error,
        title: "New Book 📙.."
      })
    } else {
      throw error; // error caught in the asyncHandler's catch block
    }
  }

}));

///////////////////////////
/* GET individual Book. */
router.get("/:id", asyncHandler(async (req, res) => {
        let book;
    try {
      book = await Book.findByPk(req.params.id);
      if(book){
      res.render("books/show", { book, title: book.title });
      }else{
        res.render("page_not_found", {
          book: {},
          title: "Book not found"
        });
      }
    } catch (error) {
      //throw  404
      throw error
    }
      const book = await Book.findByPk(req.params.id);
  if (book) {
    res.render('books/update-book', { book, title: 'Update Book' });
  } else {
      res.status(404).render('error', {
        message: 'Page not found',
        error: {
          status: 404,
          stack: 'The book you were looking for does not exist :('
        }
      })
}));

////////////////////////
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
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if (book){
      await book.update(req.body)
      res.redirect("/Books/" + book.id);
    } 
    else {
          res.render("page_not_found", {
            book: {},
            title: "Page Not Found"
          });
        }
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
          book = await Book.build(req.body);
          book.id = req.params.id; 
          res.render("books/" + req.params.id, { // suppost to redirect to books/:id
            book,
            error,
            title: "Edit book 📝"
          });
        } else {
          throw error;
      }
  } 
  
}));

///////////////////////////
/* Delete Book form. */
router.get("/:id/delete", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render("books/", {
    book,
    title: "Delete Book"
  });
}));

/* Delete individual Book. */
router.post('/:id/delete', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect("/books");
}));

module.exports = router;
