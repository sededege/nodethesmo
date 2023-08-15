// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from '../../lib/mongodb'
import NextCors from 'nextjs-cors';
const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getPosts(req, res);
        }

        case 'POST': {
            return addPost(req, res);
        }

        case 'PUT': {
            return updatePost(req, res);
        }

        case 'DELETE': {
            return deletePost(req, res);
        }
    }
}

// Getting all posts.
async function getPosts(req, res) {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });
    await clientPromise
    try {
        const client = await clientPromise
        const db = client.db("Thesmo")
        let cratelist = await db
            .collection('Crates')
            .find({})
            .sort({ published: -1 })
            .toArray();
        return res.json(
            cratelist
        );
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

// Adding a new post
async function addPost(req, res) {
    try {
        let { db } = await connectToDatabase();
        let date = {date: Date.now()}
        let cdata = JSON.parse(req.body)
        cdata.push(date)
        console.log(cdata)
        // await db.collection('Crates').insertOne(JSON.parse(cdata));
        return res.json({
            message: 'Post added successfully',
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false
        });
    }
}

// Updating a post
async function updatePost(req, res) {
    try {
        let { db } = await connectToDatabase();

        await db.collection('posts').updateOne(
            {
                _id: new ObjectId(req.body),
            },
            { $set: { published: true } }
        );

        return res.json({
            message: 'Post updated successfully',
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

// deleting a post
async function deletePost(req, res) {
    try {
        let { db } = await connectToDatabase();

        await db.collection('posts').deleteOne({
            _id: new ObjectId(req.body),
        });

        return res.json({
            message: 'Post deleted successfully',
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}