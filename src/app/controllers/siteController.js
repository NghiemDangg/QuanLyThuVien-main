const bcrypt = require("bcrypt");
const User = require("../models/User");
const Book = require("../models/Book");
const { MongoClient } = require("mongodb");
const CallCard = require("../models/CallCard");
require("dotenv").config();
const uri = process.env.URI;
const jwt = require('jsonwebtoken')

const client = new MongoClient(uri);

class SiteController {

    index(req, res) {
        if (req.cookies.accessToken) {
            return res.redirect('/admin/user')
        }
        res.render('homepage', {
            layout: 'login'
        })
    }

    getCreateUser(req, res) {
        if (!req.cookies.accessToken) {
            return res.redirect('/')
        }
        const decode = jwt.verify(req.cookies.accessToken, 'secretkey')
        User.findOne({_id: decode.id}, function(err, user) {
            if (user.type != 'admin') {
                return res.clearCookie('accessToken').redirect('/')
            } else return res.render("create/createUser");
        })
    }

    async postCreateUser(req, res) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            const newUser = await new User({
                userid: req.body.userid,
                personName: req.body.personName,
                phone: req.body.phone,
                location: req.body.location,
                username: req.body.username,
                password: hashed,
            });

            const user = await newUser.save();
            res.redirect("/admin/user");
        } catch (err) {
            console.log(err);
        }
    }

    getCreateBook(req, res) {
        if (!req.cookies.accessToken) {
            return res.redirect('/')
        }
        const decode = jwt.verify(req.cookies.accessToken, 'secretkey')
        User.findOne({_id: decode.id}, function(err, user) {
            if (user.type != 'admin') {
                return res.clearCookie('accessToken').redirect('/')
            } else return res.render("create/createBook");
        })
        
    }

    postCreateBook(req, res) {
        let newBook = new Book({
            bookid: req.body.bookid,
            bookName: req.body.bookName,
            bookCategory: req.body.bookCategory,
            author: req.body.author,
            publicationDate: req.body.publicationDate,
            amount: req.body.amount,
        });
        if (req.file) {
            newBook.bookThumbnail = "/img/" + req.file.filename;
        }
        newBook
            .save()
            .then(() => {
                res.redirect("/admin/user");
            })
            .catch((err) => {
                console.error(err);
            });
    }

    async search(req, res) {
        // try {
        //     await client.connect();
        //     const database = client.db("QuanLyThuVien");
        //     const coll = database.collection("users");
        //     let result = await coll
        //         .aggregate([
        //             {
        //                 $search: {
        //                     autocomplete: {
        //                         query: `${req.query.term}`,
        //                         path: "userid",
        //                         fuzzy: {
        //                             maxEdits: 1,
        //                         },
        //                     },
        //                 },
        //                 //
        //             },
        //             { $project: { _id: 0, userid: 1, personName: 1 } },
        //             { $match: { type: { $ne: "admin" } } },
        //         ])
        //         .toArray();
        //     res.json(result);
        // } catch (error) {
        //     res.status(500).send(error.message);
        // } finally {
        //     await client.close();
        // }
    }

    async getCreateCallCard(req, res) {
        // try {
        //     await client.connect();
        //     const database = client.db("QuanLyThuVien");
        //     const coll = database.collection("users");
        //     let result = await coll
        //         .aggregate([
        //             {
        //                 $search: {
        //                     autocomplete: {
        //                         query: `DG`,
        //                         path: "userid",
        //                         fuzzy: {
        //                             maxEdits: 1,
        //                         },
        //                     },
        //                 },

        //                 //
        //             },
        //             { $project: { _id: 0, userid: 1 } },
        //         ])
        //         .toArray();
        //     res.send(result);
        // } catch (error) {
        //     res.status(500).send(error.message);
        // } finally {
        //     await client.close();
        // }
        if (!req.cookies.accessToken) {
            return res.redirect('/')
        }
        const decode = jwt.verify(req.cookies.accessToken, 'secretkey')
        User.findOne({_id: decode.id}, function(err, user) {
            if (user.type != 'admin') {
                return res.clearCookie('accessToken').redirect('/')
            }
        })
        try {
            let users = await User.aggregate([
                { $project: { _id: 0, userid: 1 } },
            ]);
            let res1 = users.map(Object.values);
            JSON.stringify(res1);
            let arr1d = [].concat(...res1);
            res.render("create/createCallCard", {
                arruser: arr1d,
            });
        } catch (err) {
            console.log(err);
        }
    }

    postCreateCallCard(req, res) {

        

        let newCallCard = new CallCard({
            userid: req.body.userid,
            idCard: req.body.idCard,
            borrowDate: req.body.borrowedDate,
            returnDate: req.body.returnDate,
            fine: req.body.fine,
            note: req.body.note,
        })
        newCallCard.save().then(()=>{
            res.redirect("/admin/callcard")
        }).catch(err => {console.log(err)});
    }
}

module.exports = new SiteController();
