const express = require ('express');
const bodyParser = require ('body-parser');
const {Articles, Users} = require('./models');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const app = express();
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const port= 3030;

//Initial Association
// users.hasMany(comments,{
//     sourceKey: 'id',
//     foreignKey: 'user_id'
// })

// users.hasMany(comments,{
//     sourceKey: 'id',
//     foreignKey: 'user_id'
// })

// articles.hasMany(comments,{
//     sourceKey: ''
// })

app.listen(port, () =>{
    console.log(`This application Run on Port : ${port}`)
})

//
app.get("/", (req, res) =>{
    res.send("SELAMAT DATANG DI DI FINAL PROJECT FE40-BE21")
})


app.post('/register',async function (req, res){
const name = req.body.name;
const email = req.body.email;
const password = req.body.password;

try{
    const newUser = await Users.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        role: 'user'
    });
    res.status(201).json({ message : "User created successfull", user: newUser});
} catch (error){
    res.status(500).json({ error: error.message});
}
})

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({
            where: {
                email,
            },
        });
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password.",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password.",
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            'secretkey',
            {
                expiresIn: "86400s",
            }
        );
            res.json({
                status: "Success",
                token: token,
                role: user.role,
                massage: "Welcome Admin",
            });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});

app.post('/article', async (req, res) => {
    try {
        const { title, content, image } = req.body;

        const newArticles = await Articles.create({
            title,
            content,
            image,
            created_at: new Date()
        });

        res.status(201).json({
            message: 'Category created successfully.', data: newArticles
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.get("/articles/:id", async (req, res) =>{
    try{
        const id = req.params.id;
 
        const detail = await Articles.findOne({
            where:{id}
        })
        res.status(200).json({ message: 'Show detail article', detail: detail });
    }
    catch (error){
        res.status(500).json({ error: error.message });
    }
})

app.get('/article', async (req, res) => {
    try {
        const allarticle = await Articles.findAll();
        res.status(200).json({ message: 'Show all article', articles: allarticle });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


// app.delete("/article/:id", async (req, res) =>{
//     try{
//         const id = req.params.id;
//         const del = await Articles.delete({
//             where:{id}
//         })
        
//     }

// })

app.delete('/article/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const article = await Articles.findByPk(id); // Pass the ID directly

        if (!article) {
            return res.status(404).json({
                message: "Articlenot found.",
            });
        }

        await Articles.destroy({
            where:{id}
        }); // Use the forum instance to delete

        res.json({
            message: "Article deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/article/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const article = await Articles.findByPk(id);

        if (!article) {
            return res.status(404).json({
                message: 'Forum not found.'
            });
        }

        article.title = title;
        article.content = content;
        await article.save();

        res.status(200).json({
            message: 'Forum updated successfully.', data: article
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});