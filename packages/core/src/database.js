import pg from 'pg'
const { Pool } = pg

let pool
function getPool() {
  if (!pool) {      
    const connectionString = process.env.DATABASE_URL;
    pool = new Pool({
        connectionString,
        application_name: "",
        max: 1,
    })
  }
  return pool
}


// USERS
// ---------------------------------------------------------------------------------------------------------------------------------------
export async function getUsers() {
    const res = await getPool().query(`
    SELECT * FROM users
    `)
    return res.rows
}

export async function getUser(id) {
    const res = await getPool().query(`
    SELECT * FROM users 
    WHERE id = $1
    `, [id])
    return res.rows[0]
}

export async function createUser({ username, email, firstName, lastName, password }) {
    const res = await getPool().query(`I
    NSERT INTO users ( username, email, firstName, lastName, password ) 
    VALUES ($1, $2, $3) 
    RETURNING *
    `, [username, email, firstName, lastName, password])
    return res.rows[0]
}

export async function updateUser(id, {  username, email, firstName, lastName, password  }) {
    const res = await getPool().query(`
    UPDATE users SET username = $1, 
                     email = $2, 
                     first_name = $3, 
                     last_name = $4, 
                     password = $5 
    WHERE id = $6 
    RETURNING *
    `, [ username, email, firstName, lastName, password, id])
    return res.rows[0]
}

export async function deleteUser(id) {
    const res = await getPool().query(`
    DELETE FROM users WHERE id = $1 
    RETURNING *
    `, [id])
    return res.rows[0]
}

// POSTS 
// ---------------------------------------------------------------------------------------------------------------------------------------
export async function getPosts() {
    const res = await getPool().query(`
    SELECT * FROM posts
    ORDER BY kudos DESC
    `)
    return res.rows
}

export async function getPost(id) {
    const res = await getPool().query(`
    SELECT * FROM posts
    WHERE id = $1
    `, [id])
    return res.rows[0]
}

export async function createPost({ user_id, title }) {
    const res = await getPool().query(`
    INSERT INTO posts (user_id, title )
    VALUES ($1, $2)
    RETURNING *
    `, [user_id, title])
    return res.rows[0]
}

export async function updatePost(id, { user_id, title }) {
    const res = await getPool().query(`
    UPDATE posts
    SET user_id = $1, title = $2 
    WHERE id = $3
    RETURNING *
    `, [user_id, title, id])
    return res.rows[0]
}

export async function deletePost(id) {
    const res = await getPool().query(`
    DELETE FROM posts
    WHERE id = $1
    RETURNING *
    `, [id])
    return res.rows[0]
}

// IMAGES
// ---------------------------------------------------------------------------------------------------------------------------------------

export async function getImages() {
    const res = await getPool().query(`
    SELECT * FROM images
    `)
    return res.rows
}

export async function getImage(id) {
    const res = await getPool().query(`
    SELECT * FROM images
    WHERE id = $1
    `, [id])
    return res.rows[0]
}

export async function createImage(data) {
    const res = await getPool().query(`
    INSERT INTO images (image_url)
    VALUES ($1)
    RETURNING *
    `, [data])
    return res.rows[0]
}

export async function updateImage(id, { user_id, image_url }) {
    const res = await getPool().query(`
    UPDATE images
    SET user_id = $1, image_url = $2
    WHERE id = $3
    RETURNING *
    `, [user_id, image_url, id])
    return res.rows[0]
}

export async function deleteImage(id) {
    const res = await getPool().query(`
    DELETE FROM images
    WHERE id = $1
    RETURNING *
    `, [id])
    return res.rows[0]
}

// TAGS

export async function getTags() {
    const res = await getPool().query(`
    SELECT * FROM tags
    `)
    return res.rows
}

export async function getTag(id) {
    const res = await getPool().query(`
    SELECT * FROM tags
    WHERE id = $1
    `, [id])
    return res.rows[0]
}

export async function createTag({ tag }) {
    const res = await getPool().query(`
    INSERT INTO tags (tag)
    VALUES ($1)
    RETURNING *
    `, [tag])
    return res.rows[0]
}

export async function updateTag(id, { tag }) {
    const res = await getPool().query(`
    UPDATE tags
    SET tag = $1
    WHERE id = $2
    RETURNING *
    `, [tag, id])
    return res.rows[0]
}

export async function deleteTag(id) {
    const res = await getPool().query(`
    DELETE FROM tags
    WHERE id = $1
    RETURNING *
    `, [id])
    return res.rows[0]
}




