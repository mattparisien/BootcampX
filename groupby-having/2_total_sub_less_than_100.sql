SELECT students.name as student, COUNT(assignment_submissions.*) as total_submissions
FROM assignment_submissions
INNER JOIN students ON students.id = student_id
WHERE students.end_date IS NULL
GROUP BY students.name
HAVING COUNT(assignment_submissions.*) < 100;