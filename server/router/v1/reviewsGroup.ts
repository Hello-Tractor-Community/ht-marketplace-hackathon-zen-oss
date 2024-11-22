import { Router } from "express";
import * as ReviewsController from "../../controllers/reviews.Controller";

const router = Router();

router.post("/", ReviewsController.createReview);
router.get("/", ReviewsController.getReview);
router.get("/all", ReviewsController.getAllReviews);
router.put("/", ReviewsController.updateReview);
router.delete("/", ReviewsController.deleteReview);

export default router
