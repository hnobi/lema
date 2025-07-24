import db from '../db/index.js';

export function listUsers(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const query = `
        SELECT users.*, addresses.street, addresses.city, addresses.state, addresses.zipcode
        FROM users
        LEFT JOIN addresses ON users.id = addresses.user_id
        LIMIT ? OFFSET ?
    `;

    db.all(query, [limit, offset], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        db.get('SELECT COUNT(*) as count FROM users', (err2, countResult) => {
            if (err2) {
                return res.status(500).json({ error: err2.message });
            }
            const totalPages = Math.ceil(countResult.count / limit);
            res.json({ users: rows, page, limit, totalPages });
        });
    });
}