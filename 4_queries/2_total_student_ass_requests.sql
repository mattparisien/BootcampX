SELECT COUNT(assistance_requests.*) as total_assistances, students.name 
FROM assistance_requests
INNER JOIN students ON students.id = student_id
WHERE NAME = 'Elliot Dickinson'
GROUP BY students.name;