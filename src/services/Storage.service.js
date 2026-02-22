const ImageKit = require("@imagekit/nodejs")

const imagekitClient = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

const uploadFile = async (file) => {
    const result = await imagekitClient.files.upload({
        file: file,
        fileName: "music_" + Date.now(),
        folder: "/SPOTIFYCLONEBACKEND/music"
    })

    return result
}

module.exports = { uploadFile }