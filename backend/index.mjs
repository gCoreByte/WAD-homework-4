// dotenv config
import * as dotenv from 'dotenv'
dotenv.config();

// Initialize sequelize, which is the ORM we are using to avoid having to write plain SQL queries
import {Sequelize, where} from "sequelize";

// Initialize helper library
import useBcrypt  from 'sequelize-bcrypt';

// Database info
const databaseName = process.env.DATABASE_NAME || "wad_homework_4";
const databaseUsername = process.env.DATABASE_USERNAME || "postgres";
const databasePassword = process.env.DATABASE_PASSWORD || "";
const databaseHost = process.env.DATABASE_HOST || "localhost";
const databaseDialect = process.env.DATABASE_DIALECT || "postgres";

const sequelize = new Sequelize(
    databaseName, databaseUsername, databasePassword, {
        host: databaseHost,
        dialect: databaseDialect
    }
)
try {
    await sequelize.authenticate();
    console.log('Connected to database successfully!');
} catch (error) {
    console.error('Failed to connect to database: ', error);
    process.exit(1);
}

// Initialize models
import { User, init as UserInit } from './models/user.mjs';
import { Post, init as PostInit } from './models/post.mjs';

UserInit(sequelize);
PostInit(sequelize);
// bcrypt helper
useBcrypt(User);

// In a perfect world every Post would belong to a User, but I'm honestly too lazy to set up custom serializers
// to avoid leaking user data.

// Create associations
//Post.belongsTo(User);
//User.hasMany(Post);


// Make sure the tables are present and match the models
// In production this should be done with migrations (can be destructive to data), but we are lazy, unpaid students :)
await sequelize.sync({ alter: true });

// Create the web server

// Imports
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

const port = 8000; // Changing this also requires changing the frontend config
const server = express();

// Config
server.use(cors( { origin: 'http://localhost:5173', credentials: true }));
server.use(express.json());
server.use(cookieParser());

// JWT config
const secret = process.env.SECRET || "what-an-amazing-secret";
const maxAge = 60 * 60; // 1 hour

// From example repo
const generateJWT = (id) => {
    return jwt.sign( { id }, secret, { expiresIn: maxAge } );
}

// Set up the server
server.listen(port, () => {
    console.log(`Server is listening on port {port}.`);
});

// Routes

//Login as a user
server.post('/auth/login/', async(req, res) => {
    try {
        console.log("login request");
        const useremail = req.body.email;
        const user = await User.findOne({
            where: {
                email: useremail
            }
        });

        if (await user.authenticate(req.body.password)){
            const token = await generateJWT(user.id);
            res
                .status(201)
                .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
                .json({ user_id: user.id })
                .send;
        } else {
            console.error("Wrong password")
            res.status(401)
        }
    } catch (err) {
        console.error(err.message)
    }
});

//Register a user
server.post('/auth/signup/', async(req, res) => {
    try {
        const e = req.body.email;
        const pw = req.body.password;
        await User.create({email: e, password: pw})
        res.json(200);
    } catch (err) {
        console.error(err.message)
    }
});

//creates a new post
server.post('/posts/', async(req, res) => {
    try {
        console.log("post request");
        const  post = req.body.body;
        const newpost = await Post.create({body: post});
        res.json(newpost);
    } catch (err) {
        console.error(err.message)
    }
});

//gets all posts
server.get('/posts/', async(req, res) => {
    try {
        console.log("post request");
        const posts = await Post.findAll();
        res.json(posts);
    } catch (err) {
        console.error(err.message)
    }
});

//deletes all posts
server.delete('/posts/', async(req, res) => {
    try {
        console.log("delete posts request");
        await Post.destroy()
        res.json(200);
    } catch (err) {
        console.error(err.message)
    }
});

//finds a post based on the given id
server.get('/posts/:id', async(req, res) => {
    try {
        console.log("post with route parameter request");
        const postId = req.params['id'];
        const post = await Post.findOne({
            where: {
                id: postId
            }
        });
        res.json(post);
    } catch (err) {
        console.error(err.message)
    }
});

//refreshes a post
server.patch('/posts/:id', async(req, res) => {
    try {
        console.log("post update request");
        const postId = req.params['id'];
        const postBody = req.body.body;
        const targetPost = await Post.findByPk(postId);
        if (targetPost === null) {
            res.status(404).json({
                status: 404,
                message: 'Not found',
                errors: [`Post with id ${postId} does not exist.`]
            });
        }
        await targetPost.update({ body: postBody });
        res.json(targetPost);
    } catch (err) {
        console.error(err.message)
    }
});

//deletes a post based on the given id
server.delete('/posts/:id', async(req, res) => {
    try {
        console.log("delete a post request");
        const { postid } = req.params;
        await Post.destroy({
            where: {
                id: postid
            }
        });
        res.json(200);
    } catch (err) {
        console.error(err.message)
    }
});

// TODO: see openapi docs