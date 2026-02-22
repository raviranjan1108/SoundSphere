const musicModel = require("../models/music.model")
const jwt = require("jsonwebtoken")
const { uploadFile } = require("../services/Storage.service")
const albumModel = require("../models/album.model")
const { all } = require("../routes/music.routes")


const createMusic = async (req, res) => {

    const { title } = req.body;
    const file = req.file;


    const result = await uploadFile(file.buffer.toString('base64'))

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user._id,
    })

    res.status(201).send({
        success: true,
        message: "Music Create Successfullt",
        music: {
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist
        }
    })
}

const createalbum = async (req, res) => {

    const { title, musics } = req.body;

    const album = await albumModel.create({
        title,
        artist: req.user._id,
        musics: musics
    })

    res.status(200).send({
        success: true,
        message: "Album Created Successfully",
        album: {
            id: album._id,
            title: album.title,
            artist: album.artist,
            musics: album.musics
        }
    })
}


const getallmusic = async (req, res) => {
    const music = await musicModel.find().limit(2).populate("artist")

    res.status(200).send({
        message: "All music are here",
        music: music
    })
}


const getallalbums = async (req, res) => {
    const albums = await albumModel.find().select("title artist").populate("artist", "username email")
    res.status(200).send({
        message: "Album fetched successfully",
        album: albums
    })

}


const getAlbumById = async (req, res) => {
    const albumId = req.params.albumId;

    const album = await albumModel.findById(albumId).populate("artist", "username email").populate("musics")
    if (!album) {
        return res.status(404).send({
            message: "Album not found"
        });
    }

    return res.status(200).send({
        message: "Album featch Successfully",
        album: album
    })

}
module.exports = { createMusic, createalbum, getallmusic, getallalbums, getAlbumById }