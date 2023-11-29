const express = require("express");
const router = express.Router();
const Board = require("../models/Board");
const User = require("../models/User");
const { isAuthenticated } = require("../middleware/auth");

router.post("/boards/:boardId/members", isAuthenticated(), async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    if (board.admin.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Only the admin of the board can add members" });
    }

    const userToAdd = await User.findById(req.body.userId);
    if (!userToAdd) {
      return res.status(404).json({ message: "User not found" });
    }

    board.members.push(userToAdd);
    await board.save();

    res.status(201).json({ message: "Member added successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/boards/:boardId/members", isAuthenticated(), async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    if (!board.members.includes(req.user._id)) {
      return res.status(403).json({ message: "Not a member of this board" });
    }

    const members = await User.find({ _id: { $in: board.members } });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete(
  "/boards/:boardId/members/:userId",
  isAuthenticated(),
  async (req, res) => {
    try {
      const board = await Board.findById(req.params.boardId);
      if (!board) {
        return res.status(404).json({ message: "Board not found" });
      }

      if (board.admin.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ message: "Only the board's admin can remove members" });
      }

      const userIdToRemove = req.params.userId;
      board.members = board.members.filter(
        (member) => member.toString() !== userIdToRemove
      );
      await board.save();

      res.json({ message: "Member removed successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;