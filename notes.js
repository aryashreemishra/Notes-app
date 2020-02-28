const chalk = require('chalk')
const fs = require('fs')




//Function to add note
const addNotes = (title,body) =>{
    const notes = loadNotes()

    const duplicateNote = notes.find((note) => {
            return note.title === title
    })
    if(duplicateNote === undefined){
        notes.push({
        title: title,
        body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('Note added!'))
    }else{
        console.log(chalk.red.inverse('Note title already exists!'))
    }
}

//function to remove note
const removeNotes =(title) => {
    const notes = loadNotes()
     const notesToKeep = notes.filter((note) => {
             return note.title !== title 
        })

       if (notes.length !== notesToKeep.length)
       {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)

       }else{
           
           console.log(chalk.red.inverse('No note found!'))
       }
    


    
   
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = () => {
    try{
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
}

//function to list note
const listNotes = () => {
    const notes = loadNotes()
     
         console.log(chalk.inverse('Your Notes: '))

         notes.forEach((note) => {
             console.log(note.title)

         })
             
         
     

}

//function to read notes
const readNotes = (title) => {
        const notes = loadNotes()
        const note = notes.find((note) => note.title === title)
            if(note){
                console.log(chalk.inverse(note.title))
                console.log(note.body)
            }else{
                console.log(chalk.red.inverse('No Note Found !'))
            }
        }
        

         

        



module.exports = {
    
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}