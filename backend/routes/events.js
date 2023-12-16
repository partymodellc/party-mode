const express = require('express')
const router = express.Router()
const event = require('../model/event')
const authHelper = require('./auth-helper')

router.get('/', (req, res) => {
    let filter = {}
    // TODO: support query params
    event.getAllEvents(filter, function (err, events) {
        if (err) {
            return res.status(500).json({ message: err.message })
        }

        return res.status(200).json(events)
    })
})

router.get('/:eventId', (req, res) => {
    event.getEventById(req.params.eventId, function (err, user) {
        if (err) {
            return res.status(500).json({ message: err.message })
        }

        if (user) {
            return res.status(200).json({
                username: user.username,
                email: user.email,
                membership: user.membership,
                picture: user.picture,
                events: user.eventIds,
                payments: user.paymentIds
            })
        }

        return res.status(404)
    })
})

router.post('/',
    // TODO: can all types of users create events?
    authHelper.requireAuthentication,
    (req, res) => {
        const {
            title,
            summary,
            description,
            images,
            location,
            startDate,
            endDate,
            view,
            userId,
            type,
            tickets,
            category,
            tags
        } = req.body

        console.log(req.files)

        event.createEvent({
            title: title,
            summary: summary,
            description: description,
            image: req.files['event-image'],
            images: images,
            location: location,
            startDate: startDate,
            endDate: endDate,
            view: view,
            userId: userId,
            type: type,
            tickets: tickets,
            category: category,
            tags: tags
        }, function (err, event) {
            if (err) {
                return res.status(500).json({ message: err.message })
            }

            if (event) {
                return res.status(201).json(event)
            }

            return res.status(500).json({ message: 'unexpected error creating event' })
        })
    }
)

router.put('/:eventId',
    authHelper.requireAuthentication,
    (req, res) => {
        // TODO: support query params
        const {
            title,
            summary,
            description,
            image,
            images,
            location,
            startDate,
            endDate,
            view,
            userId,
            type,
            tickets,
            category,
            tags
        } = req.body

        // const eventImageName = req.files.eventImage[0].filename
        // const eventImageName = []
        // for(let i = 0; i<req.files.eventImage.length; i++){
        //   const oneFile = req.files.eventImage[i];
        //   if (oneFile.fieldname === 'eventImage'){
        //     eventImageName.push(file.fieldname);
        //   }
        // }
        // const eventImage = req.files.eventImage

        // const eventImagesNames = [];
        // for (let i = 0; i < req.files.eventImages.length; i++) {
        //
        //     const file = req.files.eventImages[i];
        //     if (file.fieldname === 'eventImages') {
        //         eventImagesNames.push(file.filename);
        //     }
        // }

        event.updateEvent(req.params.eventId, {
            title: title,
            summary: summary,
            description: description,
            image: image,
            images: images,
            location: location,
            startDate: startDate,
            endDate: endDate,
            view: view,
            userId: userId,
            type: type,
            tickets: tickets,
            category: category,
            tags: tags
        },
            (err, event) => {
                if (err) {
                    return res.status(500).json({ message: err.message })
                }

                return res.status(200).json(event)
            }
        )
    }
)

router.delete('/:eventId',
    authHelper.requireAuthentication,
    (req, res) => {
        // TODO: event should only be deleted under certain guidelines
        event.deleteEvent(req.params.eventId, function (err, event) {
            if (err) {
                return res.status(500).json({ message: err.message })
            }

            if (event) {
                res.status(204)
            }

            res.status(500).json({ message: 'Unexpected error deleting event' })
        })

    }
)

module.exports = router