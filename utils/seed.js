const connection = require('../config/connection');
const { User, Thoughts} = require('../models')
/*const {
    getRandomName,
    getRandomComments,
    getRandomPost,
    genRandomIndex,
  } = require('./data');*/
  console.time('seeding');


connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});
    await Thoughts.deleteMany({});

   const seedThoughts=[
        {
          thoughtText: "I love ice cream",
          username: 'sharon1983',
          reactions:[
            {
                reactionBody: 'I do too!',
                username: 'mike1980'
            },
            {
                reactionBody: 'Strawberry is my favorite',
                username: 'hillary1985'
            }
          ]

        },
        {
            thoughtText: "I love sushi",
            username: 'ray1989',
            reactions:[
              {
                  reactionBody: 'I do too!',
                  username: 'clyde1981'
              },
              {
                  reactionBody: 'Tuna is my favorite',
                  username: 'sampson1984'
              }
            ]
  
          },
          {
            thoughtText: "I love school",
            username: 'clyde1981',
            reactions:[
              {
                  reactionBody: 'I do too!',
                  username: 'hillary1985'
              },
              {
                  reactionBody: 'Science is my favorite',
                  username: 'mike1980'
              }
            ]
  
          }

    ]
    const seedUsers=[
        {
            username: 'mike1980',
            email: 'mike1980@gmail.com',
            thoughts:[

            ],
            friends:[
                

            ]
        },
        {
            username:'hillary1985',
            email:'hillary1985@gmail.com',
            thoughts:[

            ],
            friends:[{
                username:'clyde1981',
            email:'clyde1981@gmail.com'
        }]
        },
        {
            username:'clyde1981',
            email:'clyde1981@gmail.com',
            thoughts:[
                {
                    thoughtText: "I love school",
                    username: 'clyde1981',
                    reactions:[
                      {
                          reactionBody: 'I do too!',
                          username: 'hillary1985'
                      },
                      {
                          reactionBody: 'Science is my favorite',
                          username: 'mike1980'
                      }
                    ]
          
                  }

            ],
            friends:[
                {
                    username:'hillary1985',
                    email:'hillary1985@gmail.com',
                 
                },{
                    username:'sampson1984',
                    email: 'sampson1984@gmail.com'
                }
                
            ]
        },
    {
        username:'sampson1984',
        email: 'sampson1984@gmail.com',
        thoughts:[

        ],
        friends:[
            
        ]
    },
    {
        username: 'ray1989',
        email: 'ray1989@gmail.com',
        thoughts:[
            {
                thoughtText: "I love sushi",
                username: 'ray1989',
                reactions:[
                  {
                      reactionBody: 'I do too!',
                      username: 'clyde1981'
                  },
                  {
                      reactionBody: 'Tuna is my favorite',
                      username: 'sampson1984'
                  }
                ]
      
              }

        ],
        friends:[
            
        ]
    },
    {
        username:'sharon1983',
        email: 'sharon1983@gmail.com',
        thoughts:[
            {
                thoughtText: "I love ice cream",
                username: 'sharon1983',
                reactions:[
                  {
                      reactionBody: 'I do too!',
                      username: 'mike1980'
                  },
                  {
                      reactionBody: 'Strawberry is my favorite',
                      username: 'hillary1985'
                  }
                ]
      
              },
              {
                thoughtText: "I love lamb chop",
                username: 'sharon1983',
                reactions:[
                  {
                      reactionBody: 'I do too!',
                      username: 'ray1989'
                  },
                  {
                      reactionBody: 'Mint sauce is my favorite',
                      username: 'hillary1985'
                  }
                ]
      
              }


        ],
        friends:[
            
        ]
    }
    ]
     await User.collection.insertMany(seedUsers)
     await Thoughts.collection.insertMany(seedThoughts)
     console.table(seedUsers)
     process.exit(0)
})