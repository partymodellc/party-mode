const {GridFsStorage} = require("multer-gridfs-storage")
const multer = require("multer")
const config = require("../config")
const {GridFSBucket} = require("mongoose").mongo

let storage
let gridFSBucket

const configure = function (db) {
    gridFSBucket = new GridFSBucket(db, {
        bucketName: 'photos'
    })

    storage = new GridFsStorage({
        url: config.mongo.connectionString,
        options: {dbName: config.mongo.databaseName},
        file: (req, file) => {
            //If it is an image, save to photos bucket
            if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
                return {
                    bucketName: config.mongo.photosBucketName,
                    filename: `${Date.now()}_${file.originalname}`,
                }
            } else {
                //Otherwise save to default bucket
                return `${Date.now()}_${file.originalname}`
            }
        },
    })
}

const upload = function () {
    return multer({storage})
}

const download = function (filename, success, error, end) {
    let downloadStream = gridFSBucket.openDownloadStreamByName(
        filename
    )

    downloadStream.on("data", function (data) {
        success(data)
    })

    downloadStream.on("error", function (err) {
        error(err)
    })

    downloadStream.on("end", () => {
        end()
    })
}

module.exports = {
    configure: configure,
    upload: upload,
    download: download
}