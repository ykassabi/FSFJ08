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
      throw error
    }

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
  let book;//defining a book
  try {
    book = await Book.findByPk(req.params.id);//looking for the book
    if (book){ //found the book
      await book.update(req.body)//performing the update
      res.redirect("/books/" + book.id);//redirecting to show this book, that it has been just updated
    } 
    else {//failed to find the book 
          res.render("page_not_found", {// render the 404 
            book: {},
            title: "Page Not Found"
          });
        }
  } catch (error) {
    if (error.name === "SequelizeValidationError") { //if the error is validation error
      book = await Book.build(req.body);//
      article.id = req.params.id; // make sure correct article gets updated
      res.render("books/edit", {//should render tamplate of the book edit
        book, // passing information data about the book
        errors: error.errors, // passing error data
        title: "Editing Book"
      })
    } else {
      throw error;
    }
  }
}))

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
