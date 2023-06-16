const { User, Thought } = require('../models');

module.exports ={
    getUsers(req,res){
        User.find()
        //.toArray()
        
        .then((users)=>res.json(users))
        .catch((err)=>res.status(500).json(err))
    },
    getSingleUser(req, res){
        User.findOne({_id:req.params.userId})
        .select('-_v')
        .then((user)=>
        !user
        ?res.status(404).json({message:'No user found with that ID'})
        :res.json(user))
        .catch((err)=> res.status(500).json(err))
    },
    createUser(req, res){
        User.create(req.body)
        .then((user)=> res.json(user))
        .catch((err) =>{
            console.log(err);
            return res.status(500).json(err)
        })

    },
    deleteUser(req,res){
        User.findOneAndRemove({_id:req.params.userId})
        .then((user) =>{
        !user
        ?res.status(404).json({message:'No user found with that ID'})
        :Thought.deleteMany({ _id: { $in : user.thoughts}})
    })
       
        .catch((err)=> err ? res.status(500).json(err):  res.json({message: 'User and thoughts deleted!'}) )
    },

    updateUser(req,res){
        User.findOneAndUpdate(
            {_id:req.params.userId},
            {$set:req.body},
            {runValidators:true, new:true}
        )
        .then((user)=>
        !user
        ?res.status(404).json({message:'No user with this Id!'})
        :res.json(user))
        .catch((err)=> res.status(500).json)
    },

    addFriend(req, res){
        User.findOneAndUpdate(
            {_id:req.params.userId},
            {$addToSet:{friends: req.params.friendId}},
            {new: true}
            
        )
        .then((user)=>
        !user
        ? res.status(404).json({message:'No user found with that ID'})
        :res.json(user)
        )
        .catch((err) => res.status(500).json(err))
    },
    removeFriend(req, res){
        User.findOneAndUpdate(
            {_id:req.params.userId},
            {$pull:{friends: req.params.friendId}},
            {new:true}
        )
        .then((user)=>
        !user
        ? res
        .status(404)
        .json({message:'No user found with that Id '})
        :res.json(user)
        )
        .catch((err) => res.status(500).json(err))
    
    }
    

};