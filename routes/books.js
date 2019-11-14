const express = require('express');
const router = express.Router();

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
  res.render("books/index", {
    Books: {},
    title: "Sequelize-It!"
  });
}));

/* Create a new Book form. */
router.get('/new', (req, res) => {
  res.render("books/new", {
    Book: {},
    title: "New Book"
  });
});

// /* POST create Book. */
// router.post('/', asyncHandler(async (req, res) => {
//   res.redirect("/Books/");
// }));

// /* Edit Book form. */
// router.get("/:id/edit", asyncHandler(async (req, res) => {
//   res.render("Books/edit", {
//     Book: {},
//     title: "Edit Book"
//   });
// }));

// /* GET individual Book. */
// router.get("/:id", asyncHandler(async (req, res) => {
//   res.render("Books/show", {
//     Book: {},
//     title: "Book Title"
//   });
// }));

// /* Update an Book. */
// router.post('/:id/edit', asyncHandler(async (req, res) => {
//   res.redirect("/Books/");
// }));

// /* Delete Book form. */
// router.get("/:id/delete", asyncHandler(async (req, res) => {
//   res.render("Books/delete", {
//     Book: {},
//     title: "Delete Book"
//   });
// }));

// /* Delete individual Book. */
// router.post('/:id/delete', asyncHandler(async (req, res) => {
//   res.redirect("/Books");
// }));

module.exports = router;