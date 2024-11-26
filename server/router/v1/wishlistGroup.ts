import { Router } from "express";
import * as WishlistController from "../../controllers/wishlist.Controller";
import { buyerAuth } from "../../middleware/userAuth";

const router = Router();

router.post("/", buyerAuth, WishlistController.addToWishlist);
router.get("/", buyerAuth, WishlistController.getBuyerWishlist);
router.delete("/", buyerAuth, WishlistController.removeFromWishlist);

export default router
