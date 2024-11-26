import { Router } from "express";
import * as ReviewsController from "../../controllers/reviews.Controller";
import { buyerAuth } from "../../middleware/userAuth";

const router = Router();

router.post("/", buyerAuth, ReviewsController.createReview);
router.get("/", ReviewsController.getReview);
router.get("/all", ReviewsController.getProductReviews);
router.put("/respond",  ReviewsController.respondToReview);
router.put("/", buyerAuth, ReviewsController.updateReview);
router.delete("/", buyerAuth, ReviewsController.deleteReview);

export default router
