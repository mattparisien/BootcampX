SELECT cohorts.name as cohort, COUNT(assignment_submissions.*) as total_submissions
FROM cohorts
INNER JOIN students ON cohort_id = cohorts.id
INNER JOIN assignment_submissions ON student_id = students.id
GROUP BY cohorts.name 
ORDER BY COUNT(assignment_submissions.*) DESC;