const express = require("express")
const { createMusic, createalbum, getallmusic, getallalbums, getAlbumById } = require("../controller/music.controller")
const multer = require("multer")

const { authArtist, accessMusic } = require("../middlewares/auth.middlewares");
const upload = multer({
    storage: multer.memoryStorage()
})

const router = express.Router()


router.post("/upload", authArtist, upload.single("music"), createMusic);

router.post("/create", authArtist, createalbum);

router.get("/", accessMusic, getallmusic)

router.get("/albums", accessMusic, getallalbums)

router.get("/albums/:albumId", accessMusic, getAlbumById)

module.exports = router