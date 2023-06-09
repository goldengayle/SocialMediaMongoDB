//const { ObjectId } = require('mongoose').Types;
const { Thought } = require('../models');

module.exports ={
    getThoughts(req,res){
        Thought.find()
        .toArray()
        .then((thoughts)=>res.json(thoughts))
        .catch((err) =>res.status(500).json(err))
    },
    getSingleThought(req, res){
        Thought.findOne({_id:req.params.thoughtId})
        .then((thought)=>
        !thought
        ?res.status(404).json({message:'No thought with that ID'})
        :res.json(thought))
        .catch((err)=> res.status(500).json(err))
    },
    createThought(req, res){
        Thought.create(req.body)
        .then((thought)=>{
            return User.findOneAndUpdate(
                {_id:req.body.userId},
                {$addToSet:{thoughts:thought._id}},
                {new:true}
            );
        })
        .then((user) =>
        !user
        ?res.status(404).json({message:'Application created, but user Id not found'})
        :res.json('Created Thought'))
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err)
        })

    },
    deleteThought(req,res){
        Thought.findOneAndDelete({_id:req.params.thoughtId})
        .then((thought)=>
        !thought?res.status(404).json({message:'No thought with this ID'})
        :User.findOneandUpdate(
            {thoughts:req.params.thoughtId},
            {$pull:{ thoughts:req.params.thoughtId}},
            {new:true}
        ))
        .then((user)=>
        !user
        ?res.status(404).json({message:'Thought deleted but no user found with this Id'})
        :res.json({message:'Thought successfully deleted'}))
        .catch((err)=> res.status(500).json(err))
    },

    updateThought(req,res){
        Thought.findOneAndUpdate(
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
    Thought.findOneAndUpdate(
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
    Thought.findOneAndUpdate(
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