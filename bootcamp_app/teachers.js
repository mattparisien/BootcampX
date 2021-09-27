const { Pool } = require('pg');
const userInput = process.argv.slice(2);

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
  SELECT DISTINCT teachers.name as teacher, cohorts.name as cohorts
  FROM cohorts
  INNER JOIN students ON students.cohort_id = cohorts.id
  INNER JOIN assistance_requests ON student_id = students.id
  INNER JOIN teachers ON teachers.id = teacher_id
  WHERE cohorts.name = '${userInput[0]}'
  ORDER BY teacher;
`)
.then(res => {
  res.rows.forEach(ass_request => {
    console.log(`${ass_request.cohorts}: ${ass_request.teacher}`)
  })
})
.catch(error => console.error('error', error.stack));