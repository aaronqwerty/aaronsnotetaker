const util = require('util');
const fs = require('fs')

const uuidv1 = require('uuid/v1');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class dbstore {
    read() {
        return readFile('db/db.json', 'utf-8')
    }

    write(note) {
        return writeFile('db/db.json', JSON.stringify(note))
    }

    // get all notes
    getAllNotes() {
        return this.read().then((notes) => {
            let notesResponse;

            try {
                notesResponse = [].concat(JSON.parse(notes))
            } catch (error) {
                notesResponse = []
            }
            return notesResponse;
        })
    }
    // add a note
    addANote(note) {
        let { title, text } = note

        if (!title || !text) {
            throw new Error('cant be blank')
        }
        let addedNote = { title, text, id: uuidv1() }

        // get notes, add new, write updated notes, return the new one
        return this.getAllNotes()
            .then((notes) => [...notes, addedNote])
            .then((updated) => this.write(updated))
            .then(() => addedNote)
    } 
    // delete a note
    deleteNote(id) {
        return this.getAllNotes()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((filtered) => this.write(filtered))
    }
}

module.exports = new dbstore();