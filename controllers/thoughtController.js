//const { ObjectId } = require('mongoose').Types;
const { Thoughts , User } = require('../models');

module.exports ={
    getThoughts(req,res){
        Thoughts.find()
        //.toArray()
        .then((thoughts)=>res.json(thoughts))
        .catch((err) =>res.status(500).json(err))
    },
    getSingleThought(req, res){
        Thoughts.findOne({_id:req.params.thoughtId})
        .then((thought)=>
        !thought
        ?res.status(404).json({message:'No thought with that ID'})
        :res.json(thought))
        .catch((err)=> res.status(500).json(err))
    },
    createThought(req, res){
        Thoughts.create(req.body)
        .then((thought) => res.json(thought))
       
        .then((thought)=>{
            return User.findOneAndUpdate(
                {_id:req.body.userId},
                {$addToSet:{thoughts: thought._id}}, //<-- fix
                {new:true}
            )
               
        })
        // .then((user) =>
        // !user
        // ?res.status(404).json({message:'Application created, but user Id not found'})
        // :res.json('Created Thought'))
        // .catch((err)=>{
        //     console.log(err);
        //     res.status(500).json(err)
        // })

    },
    deleteThought(req,res){
        Thoughts.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) =>
        !thought 
        ?res.status(404).json({message: `No thought exists`})
        :User.findOneAndUpdate(
            { thoughts:req.params.thoughtId },
            { $pull: { thoughts: { _id:req.params.thoughtId}}},
            {new:true})

        
        )
        // .then((user)=>{
        //     console.log(user)
        // !user
        // ?res.status(404).json({message:'Thought deleted but no user found with this Id'})
        // :res.json({message:'Thought successfully deleted'})})
        // .catch((err)=> res.status(500).json(err))
    },

    updateThought(req,res){
        Thoughts.findOneAndUpdate(
            {_id:req.params.thoughtId},
            {$set:req.body},
            {runValidators:true, new:true}
        )
        .then((thought)=>
        !thought
        ?res.status(404).json({message:'No thought with this Id'})
        :res.json(thought))
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err)
        })
    },
createReaction(req, res){
    Thoughts.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$addToSet:{reactions:req.body}},
        {runValidators:true, new:true}
    )
    .then((thought)=>
    !thought
    ?res.status(404).json({message:'No thought with this Id'})
    :res.json(thought)
    )
    .catch((err)=> res.status(500).json(err))
},
deleteReaction(req, res){
    Thoughts.findOneAndUpdate(
        {_id:req.params.thoughtId},
        {$pull:{reactions:{reactionId: req.params.reactionId}}},
        {runValidators:true, new:true}
    )
    .then((thought)=>
    !thought
    ?res.status(404).json({message:'No thought with this Id'})
    :res.json({message:'reaction deleted'}))
    .catch((err)=>res.status(500).json(err))
}


};