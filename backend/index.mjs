// Initialize sequelize, which is the ORM we are using to avoid having to write plain SQL queries
import { Sequelize } from "sequelize";

// Initialize helper library
import { useBcrypt } from 'sequelize-bcrypt';

export const sequelize = new Sequelize('postgres://postgres:@localhost:5432/')
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
server.use(cors( { origin: '*', credentials: true }));
server.use(express.json());
server.use(cookieParser());

// JWT config
const secret = process.env.SECRET || "what-an-amazing-secret";
const maxAge = 60 * 60; // 1 hour

// From example repo
const generateJWT = (id) => {
    return jwt.sign( { id }, secret, { expiresIn: maxAge } );
}

// Setup the server
server.listen(port, () => {
    console.log(`Server is listening on port {port}.`);
});

// Routes

// TODO: see openapi docs