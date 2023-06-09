const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength:280
        },
        createdAt: 
        {
            type: Date,
            default:Date.now
        },
        username:
        {
            type:String,
            required:true,
        },
        //reactions: [reactionSchema]//
        },

    {
        toJSON: {
          
            getters: true,
            virtuals: true,
        },
    }
)

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

thoughtSchema.methods.getDocumentInfo = function () {
    return this.createdAt.toDateString();}
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
