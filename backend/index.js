const express = require("express");
const { connectDB, sql } = require('./db'); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
app.use(express.json());

connectDB();



// Middleware: Authenticate Token
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.user = user;
    next();
  });
};

// Routes
// Example route that fetches data from the database
app.get('/data', async (req, res) => {
  try {
    // Querying the database
    const result = await sql.query('SELECT * FROM Employee'); // Adjust the query as needed
    res.json(result.recordset); // Send the fetched data as JSON
  } catch (err) {
    console.error('Error querying the database:', err);
    res.status(500).send('Database query failed');
  }
});


// Register Employee
app.post("/employees/register", async (req, res) => {
  const { username, password, email, age, gender } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [result] = await db.query(
      "INSERT INTO Employee (UserName, Password, Email, Age, Gender) VALUES (?, ?, ?, ?, ?)",
      [username, hashedPassword, email, age, gender]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
app.post("/employees/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM Employee WHERE UserName = ?", [username]);
    if (!rows.length || !(await bcrypt.compare(password, rows[0].Password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: rows[0].EmployeeID, username: rows[0].UserName }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create Post
app.post("/posts", authenticateToken, async (req, res) => {
  const { description, imageURL } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO Post (EmployeeID, PostDescription, ImageURL) VALUES (?, ?, ?)",
      [req.user.id, description, imageURL]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Posts
app.get("/posts", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM Post");
  res.json(rows);
});

// Update Post
app.put("/posts/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { description, imageURL } = req.body;

  try {
    await db.query(
      "UPDATE Post SET PostDescription = ?, ImageURL = ? WHERE PostID = ?",
      [description, imageURL, id]
    );
    res.json({ message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Post
app.delete("/posts/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM Post WHERE PostID = ?", [id]);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
