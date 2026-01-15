import multer from "multer";
import path from "path";

const multerConfig = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".png" &&
      ext !== ".pdf" &&
      ext !== ".mp4" &&
      ext !== ".doc" &&
      ext !== ".docx"
    ) {
      cb(null, true);
      return;
    }
    cb(null, true);
  },
});

export default multerConfig;
