const config = require("../config")
const repository = require('../repository')
const mongoose = require("mongoose")

let gridFSBucket

const configure = function () {
    gridFSBucket = new mongoose.mongo.GridFSBucket(repository.mongoose.connection.db, {
        bucketName: config.mongo.photosBucketName
    })
}

const upload = (file) => {
    const uploadStream = gridFSBucket.openUploadStream()
    uploadStream.write(file.buffer)
    uploadStream.filename = `${Date.now()}_${file.originalname}`
    uploadStream.end()
    return uploadStream.id.toString()
}

const download = function (imageId, success, error, end) {
    const downloadStream = gridFSBucket.openDownloadStream(mongoose.Types.ObjectId(imageId))

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

const deleteImage = (id) => {
    return gridFSBucket.delete(mongoose.Types.ObjectId(id))
}

module.exports = {
    configure: configure,
    upload: upload,
    download: download,
    deleteImage: deleteImage
}