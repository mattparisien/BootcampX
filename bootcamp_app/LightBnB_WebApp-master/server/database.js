const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require("pg");
const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb",
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  const text = "SELECT * FROM users WHERE email = $1";
  const values = [email];
  const user = pool
    .query(text, values)
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => {
      console.log("error", err);
    });

  return new Promise((resolve, reject) => {
    resolve(user);
    reject(null);
  });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  const text = "SELECT * FROM users WHERE id = $1";
  const values = [id];

  const userById = pool
    .query(text, values)
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => {
      console.log(err);
    });

  return new Promise((resolve, reject) => {
    resolve(userById);
    reject(null);
  });
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const text =
    "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *";
  const values = [user.name, user.email, user.password];

  const newUser = pool.query(text, values).then((res) => {});

  return new Promise((resolve, reject) => {
    resolve(newUser);
  });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  const text = `
    SELECT properties.*, reservations.*, AVG(rating) as average_rating
    FROM reservations
    INNER JOIN properties ON reservations.property_id = properties.id
    INNER JOIN property_reviews ON properties.id = property_reviews.property_id
    WHERE reservations.guest_id = $1
    GROUP BY properties.id, reservations.id
    LIMIT $2
  ;`;

  const values = [guest_id, limit];
  return pool
    .query(text, values)
    .then((res) => res.rows)
    .catch((err) => console.log(err));
};

exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  const queryParams = [];

  let text = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    text += `WHERE city LIKE $${queryParams.length}`;
  }

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    text += `WHERE properties.owner_id = $${queryParams.length}`;
  }

  if (options.mininum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    text += `WHERE properties.cost_per_night >= $${queryParams.length}`;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    text += `WHERE properties.cost_per_night <= $${queryParams.length}`;
  }

  queryParams.push(limit);
  text += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  console.log(text, queryParams);

  return pool
    .query(text, queryParams)
    .then((res) => res.rows)
    .catch((err) => console.log(err));
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  let text = `
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
  VALUES (
    $1,
    $2, 
    $3, 
    $4,
    $5,
    $6,
    $7,
    $8,
    $9,
    $10,
    $11,
    $12,
    $13,
    $14,
    $15
  )
  RETURNING *;
  `;

  let values = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms,
    property.country,
    property.street,
    property.city,
    property.province,
    property.post_code,
    "true",
  ];

  return pool.query(text, values).then(res => res.rows);
};
exports.addProperty = addProperty;
