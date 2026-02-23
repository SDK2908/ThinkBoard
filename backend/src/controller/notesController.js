import Note from "../models/Note.js"
export async function getAllNotes (req,res)  {
    try {
        const notes = await Note.find().sort({createdAt:-1})
        res.status(200).json(notes);
    }catch(e){
        console.error("Error is getAllNotes controller",e)
        res.status(500).json({message: "Internal server error"});
    }
};
export async function getNoteById (req,res)  {
    try {
        const note = await Note.findById(req.params.id)
        if(!note) {
            return res.status(404).json({message:"Note not found"})
        }
        res.status(200).json(note);

    }catch(e){
        console.error("Error is getAllNotes controller",e)
        res.status(500).json({message: "Internal server error"});
    }
};
export async function createNote(req,res)  {
    try{
        const{title,content} = req.body;
        const newNote = new Note({title, content})
        const savedNote = await newNote.save()
        res.status(201).json({savedNote})
    }catch(e){
        console.error("Error in createNote controller", e)
        res.status(500).json({message:"Internal server error"});
    }
}

export async function deleteNote(req,res)  {
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id,);
        if(!deletedNote) {
            return res.status(404).json({message:"Note not found"})
        }
        res.status(201).json({deletedNote})
    }catch(error){
        console.error("Error in updateNode controller", error)
        res.status(500).json({message:"Internal server error"});
    }
}     

export async function updateNote(req,res)  {
    try{
        const{title,content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title, content} ,
            {
                new:true,
            }
        );
        if(!updatedNote) {
            return res.status(404).json({message:"Note not found"})
        }
        res.status(201).json({updatedNote})
    }catch(error){
        console.error("Error in updateNode controller", error)
        res.status(500).json({message:"Internal server error"});
    }
}