const router = require('express').Router();
const dbstore = require('../../db/dbstore');

router.get('/notes', (req, res) => {
    dbstore
    .getAllNotes()
    .then((notes) => {
        return res.json(notes)
    })
    .catch((error) => res.status(500).json(error))
})


router.post('/notes', (req, res) => {
    dbstore
    .addANote(req.body)
    .then((notes) => {
        return res.json(notes)
    })
    .catch((error) => res.status(500).json(error))
})

router.delete('/notes/:id', (req, res) => {
    dbstore
    .deleteNote(req.params.id)
    .then(() => {
        return res.json({ ok: true })
    })
    .catch((error) => res.status(500).json(error))
})
module.exports = router;