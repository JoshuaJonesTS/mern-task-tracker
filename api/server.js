const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('colors');

const app = express();
const PORT = process.env.PORT || 3001
const connectDB = require('./config/db');

app.use(express.json());
app.use(cors());

connectDB();

// Models
const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {
	const todos = await Todo.find();

	res.json(todos);
});

app.post('/todo/new', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	})

	todo.save();

	res.json(todo);
});

app.delete('/todo/delete/:id', async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);

	res.json({result});
});

app.get('/todo/complete/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.complete = !todo.complete;

	todo.save();

	res.json(todo);
})

app.put('/todo/update/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.text = req.body.text;

	todo.save();

	res.json(todo);
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}...`));
