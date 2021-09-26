SELECT teachers.name as teacher, students.name as student, assignments.name as assignment, (assistance_requests.completed_at - assistance_requests.started_at) as duration
FROM assignments
INNER JOIN assistance_requests ON assignment_id = assignments.id
INNER JOIN teachers ON teachers.id = teacher_id
INNER JOIN students ON students.id = student_id
ORDER BY duration;

