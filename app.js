// 导入所需的模块
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// 连接MongoDB数据库
mongoose.connect('mongodb://localhost:27017/history');
const db = mongoose.connection;

// 检测数据库连接状态
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

// 创建Express应用
const app = express();

// 使用body-parser中间件解析请求体
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 定义用户模型
// const User = mongoose.model('User', new mongoose.Schema({
//     username: String,
//     password: String
// }));

// 注册用户
// app.post('/api/register', async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const user = await User.create({ username, password });
//         res.json({ success: true, message: 'User registered successfully', user });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// 用户登录
// app.post('/api/login', async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const user = await User.findOne({ username, password });
//         if (user) {
//             res.json({ success: true, message: 'User logged in successfully', user });
//         } else {
//             res.status(401).json({ success: false, message: 'Invalid username or password' });
//         }
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// 启动Express服务器
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/' , (req,res) => {
    res.send("Hello World")
  })
// 定义书籍模型
const Book = mongoose.model('Book', new mongoose.Schema({
    name: String,
    author: String
}));

// 获取所有书籍
app.get('/api/books', async (req, res) => {
    try {
        const finePosts = await Book.find();
        res.json(finePosts)
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// 定义文章模型
// const Article = mongoose.model('Article', new mongoose.Schema({
//     title: String,
//     content: String,
//     author: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     }
// }));

// 创建文章
// app.post('/api/articles', async (req, res) => {
//     try {
//         const { title, content, author } = req.body;
//         const article = await Article.create({ title, content, author });
//         res.json({ success: true, message: 'Article created successfully', article });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// 获取所有文章
// app.get('/api/articles', async (req, res) => {
//     try {
//         const articles = await Article.find().populate('author', 'username');
//         res.json({ success: true, articles });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });
