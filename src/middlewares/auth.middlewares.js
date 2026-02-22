const jwt = require("jsonwebtoken")


const authArtist = (req, res, next) => {
    const token = req.cookies?.token;


    if (!token) {
        return res.status(401).send({
            message: "Unauthorized"
        })
    }


    try {

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        if (decode.role !== "artist") {

            return res.status(403).send({
                message: "you don't have access"
            })
        }

        req.user = decode;

        next()

    } catch (err) {
        console.log(err)
        res.status(401).send({
            message: "Unauthorized"
        })

    }
}


const accessMusic = (req, res, next) => {
    const token = req.cookies?.token;


    if (!token) {
        return res.status(401).send({
            message: "Unauthorized"
        })
    }

    try {

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        if (decode.role !== "user") {
            return res.status(403).send({
                message: "you don't access all music"
            })
        }

        req.user = decode;

        next()

    } catch (err) {
        console.log(err)
        res.status(401).send({
            message: "Unauthorized"
        })
    }
}

module.exports = {
    authArtist,
    accessMusic
};