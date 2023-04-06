import { Router } from "express";
import { eventController } from "../controllers/event.controller";
import { authorize } from "../middleware/authorize.middleware";
import multer from "multer";
import { posterDir } from "../../config/vars";

const router = Router();

router.route("/").get([eventController.getAllEvents]);
router.route("/create").put([
  authorize,
  multer({
    storage: multer.diskStorage({
      destination: posterDir,
      filename: (req, file, next) => {
        next(null, `${Date.now()}--${file.originalname}`);
      },
    }),
  }).single("posterLink"),
  eventController.createEvent,
]);
router.route("/eventDetails").get([authorize, eventController.getEventDetails]);
router.route("/register").put([authorize]);
router.route("/registerGroup").put([authorize]);

export { router as eventRoutes };
