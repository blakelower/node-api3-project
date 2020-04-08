const express = require("express");
const db = require("./postDb");
const router = express.Router();

router.get("/", (req, res) => {
  db.get().then((post) => {
    res.status(200).json(post);
  });
});

router.get("/:id", (req, res) => {
  db.getById(req.params.id)
    .then((post) => {
      if (post.length > 0) {
        res.status(200).json(post);
      } else {
        res.status(400).json({
          message: "Post not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving post",
      });
    });
});

router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then((del) => {
      if (del > 0) {
        res.status(200).json({
          message: "Deleted",
        });
      } else {
        res.status(200).json({
          message: "Post can not be found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error removing",
      });
    });
});

router.put("/:id", (req, res) => {
  if (!req.body.text || !req.body.user_id) {
    return res.status(200).json({
      message: "Invalid Post",
    });
  }
  const update = {
    text: req.body.text,
    user_id: req.body.user_id,
  };
  db.update(req.params.id, update)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post can not be found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error updating post",
      });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;
  db.getById(id).then((post) => {
    if (post) {
      req.post = post;
      next();
    } else {
      res.status(400).json({ message: "ID not found" });
    }
  });
}

module.exports = router;
