const express = require("express");
const db = require("./userDb");
const router = express.Router();

router.post("/", validateUser, (req, res) => {
  db.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: "error!" });
    });
});

router.post("/:id/posts", validateUser, validatePost, (req, res) => {
  req.body.user_id = req.params.id;
  db.insert(req.body)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({ messgae: "Try Again" });
    });
});

router.get("/", (req, res) => {
  db.get()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: "Can not get users" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  db.get()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed" });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  db.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error" });
    });
});

router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then((user) => {
      res.status(200).json({ message: "DELETE SUCCESS" });
    })
    .catch((err) => {
      res.status(500).json({ message: "ERROR" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const update = req.body;
  db.update(id, newnew)
  .then(update => {
    res.status(200).json(update);
  });
});

//custom middleware

function validateUserId(req, res, next) {
  const {id} = req.params;
  db.getById(id)
  .then(user => {
    if(user){
      req.user = user;
      next()
    } else {
      res.status(400).json({message: "ID not found"})
    }
  })
}

function validateUser(req, res, next) {
  const body = req.body;
  const name = req.body.name;
  if (!body){
    res.status(400).json({message: "missing body field"})
  } else if (!name) {
    res.status(400).json({messgae: "missing name field"})
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const body = req.body;
  const text = req.body.text;
  if (!body){
    res.status(400).json({message: "missing body field"});
  } else if (!text){
    res.status(400).json({message: "missing text field"})
  } else {
    next();
  }
}

module.exports = router;
