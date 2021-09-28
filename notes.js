const chalk = require('chalk')
const fs =require('fs')
const getNotes =  () =>{
    return ' your notes'
}
// function for remove notes 
const removeNotes = (title)=>{
    const notes = loadNotes()
    const prevLength = notes.length
    const newSet = notes.filter(note=>{
        return (note.title !== title)
    })
    if(newSet.length  === prevLength)
    {
        console.log(chalk.red(' there is not match with the given'))
    }
    else{
        saveNotes(newSet)
        console.log(chalk.green('removing your notes ..'))
    }
}
//  function for add notes
const addNotes = (title,body) =>{
    const notes = loadNotes()
    const duplicates = notes.filter((note)=>{
        return  (note.title === title)
    })

    debugger  

    if(duplicates.length > 0 ){
        console.log(chalk.red('note title already taken'))
        console.log(chalk.yellow('can not add your notes'))
    }
    else{

        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        console.log(chalk.green('added your notes'))
    }
}

//  this will return all the previously written notes array
const loadNotes = (print=false) =>{
    try
    {
        const dataBuffer = fs.readFileSync('notes.json')
        const datajson = dataBuffer.toString()
        returnData = JSON.parse(datajson)
        if(print){
            returnData.map(no=>{
                console.log(chalk.bgYellowBright.black.bold(no.title))
                console.log(chalk.white(no.body))
            })
        }
        return returnData
    }
    catch(e)
    {
        return []
    }
}
//  to read a particular note the user shall enter the title of the addNotes

const readNotes = (title)=>{
    const notes = loadNotes()
    const req = notes.filter(note =>{
        return (note.title === title)
    })
    if(req.length === 0){
        console.log(chalk.red('no match found '))
    }
    else{
        console.log(chalk.yellow(req[0].body))
    }
}

//  getting the notes and saving it in our json file
const saveNotes = (notes) =>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
    console.log(chalk.yellow('saving your notes'))
}

module.exports = {
    getNotes:getNotes,
    addNotes:addNotes,
    removeNotes:removeNotes,
    loadNotes:loadNotes,
readNotes:readNotes
}