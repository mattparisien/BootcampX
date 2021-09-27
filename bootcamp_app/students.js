const { Pool } = require('pg');
const userInput = process.argv.slice(2);

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryStr = `
  SELECT students.id, students.name, cohorts.name as cohort
  FROM students
  INNER JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
`;

const values = [`%${userInput[0]}%`, `${userInput[1]}` || 5];

pool.query(queryStr, values) 
.then(res => {
  res.rows.forEach((user) => {
    console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`);
  }) 
})
.catch(error => console.error('error', error.stack));
