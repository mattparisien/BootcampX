SELECT DISTINCT teachers.name as teacher, cohorts.name as cohorts
FROM cohorts
INNER JOIN students ON students.cohort_id = cohorts.id
INNER JOIN assistance_requests ON student_id = students.id
INNER JOIN teachers ON teachers.id = teacher_id
WHERE cohorts.name = 'JUL02'
ORDER BY teacher
