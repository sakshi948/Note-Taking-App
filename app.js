const chalk = require('chalk')
const yargs = require('yargs')
const notes= require('./notes')

yargs.version('1.1.0')
// add command
yargs.command({
    command:'add',
    describe: 'add a note',
    builder:{
        title:{
            describe:'notes title',
            demandOption:true,
            type:'string',
        },
        body:{
            describe:'content of the note',
            demandOption:true,
            type:'string',
        },
    },
    handler() {
        console.log(`adding a note -- '${yargs.argv.title}' with content '${yargs.argv.body}'`)
        notes.addNotes(yargs.argv.title,yargs.argv.body)
    }
})

//  remove command
yargs.command({
    command:'remove',
    describe: 'remove a note',
    builder:{
        title:{
            describe:'notes title',
            demandOption:true,
            type:'string',
        }
    },
    handler() {
        notes.removeNotes(yargs.argv.title)
    }
})

yargs.command({
    command:'read',
    describe: 'read a note',
    builder:{
        title:{
            describe:'notes title',
            demandOption:true,
            type:'string',
        }
    },
    handler() {
        console.log('reading a note')
        notes.readNotes(yargs.argv.title)
    }
})
yargs.command({
    command:'list',
    describe: 'list the notes',
    handler() {
        console.log(chalk.blue('list of notes:'))
        notes.loadNotes(true)
    }
})

console.log(yargs.argv)
