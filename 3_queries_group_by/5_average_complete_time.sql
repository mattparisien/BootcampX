SELECT students.name as name, AVG(assignment_submissions.duration) as average_assignment_duration
FROM students
INNER JOIN assignment_submissions ON student_id = students.id
WHERE students.end_date IS NULL
GROUP BY students.name
ORDER BY AVG(assignment_submissions.duration) DESC;