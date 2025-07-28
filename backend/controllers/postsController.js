import db from '../db/index.js';

export function listPosts(req, res) {
	const userId = req.params.userId;
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const offset = (page - 1) * limit;

	const query = `
        SELECT 
            posts.*, 
            users.id as user_id, 
            users.name as user_name, 
            users.email as user_email
        FROM posts
        JOIN users ON posts.user_id = users.id
        WHERE users.id = ?
		ORDER BY posts.created_at DESC
        LIMIT ? OFFSET ?
    `;

	db.all(query, [userId, limit, offset], (err, rows) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		const posts = rows.map(row => {
			const { user_id, user_name, user_email, ...post } = row;
			return post;
		});

		const user = rows[0]
			? {
				id: rows[0].user_id,
				name: rows[0].user_name,
				email: rows[0].user_email
			}
			: null;

		res.json({ posts, user });
	});
}


export function deletePost(req, res) {
	const postId = req.params.postId;

	const query = `DELETE FROM posts WHERE id = ?`;
	db.run(query, [postId], function (err) {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		if (this.changes === 0) {
			return res.status(404).json({ message: 'Post not found' });
		}
		res.status(204).send();
	});
}

export function addPost(req, res) {
	const { id, user_id, title, body, created_at } = req.body;

	if (!id || !user_id || !title || !body || !created_at) {
		return res.status(400).json({ message: 'All fields are required' });
	}

	const query = `
        INSERT INTO posts (id, user_id, title, body, created_at)
        VALUES (?, ?, ?, ?, ?)
    `;

	db.run(query, [id, user_id, title, body, created_at], function (err) {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.status(201).json({ 
			id,
			user_id,
			title,
			body,
			created_at
		});
	});
}