const connection = require('../config/connection');
const { User, Thought, Reaction} = require('../models')

  console.time('seeding');


connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});
    await Thought.deleteMany({});
   

   
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
            friends:[]
        },
        {
            username:'clyde1981',
            email:'clyde1981@gmail.com',
            thoughts:[],
            friends:[]
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
           

        ],
        friends:[
            
        ]
    },
    {
        username:'sharon1983',
        email: 'sharon1983@gmail.com',
        thoughts:[

        ],
        friends:[
            
        ]
    },
    ]
       await User.collection.insertMany(seedUsers),
      //await Thoughts.collection.insertMany(seedThoughts),
     console.table(seedUsers),
     process.exit(0)
})