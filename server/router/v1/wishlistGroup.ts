import { Router } from "express";
import * as WishlistController from "../../controllers/wishlist.Controller";

const router = Router();

router.post("/", WishlistController.addToWishlist);
router.get("/", WishlistController.getBuyerWishlist);
router.delete("/", WishlistController.removeFromWishlist);

export default router
