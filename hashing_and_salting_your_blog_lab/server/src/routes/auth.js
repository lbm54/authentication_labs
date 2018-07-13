import { Router } from "express";
import passport from "passport";
import { generateHash } from "../utils/security";

let router = Router();

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, tok, info) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    } else if (!tok) {
      return res.status(401).json(info);
    } else {
      return res.status(201).json(tok);
    }
  })(req, res, next);
});

router.get("/generate/:pw", async (req, res, next) => {
  try {
    let hash = await generateHash(req.params.pw);
    res.send(hash);
  } catch (err) {
    next(err);
  }
});

export default router;
