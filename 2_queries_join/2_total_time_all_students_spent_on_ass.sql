SELECT SUM (assignment_submissions.duration) as total_duration
FROM assignment_submissions
INNER JOIN students ON students.id = student_id
INNER JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = 'FEB12';

SELECT name
FROM world
WHERE name LIKE concat(name, '%City')



