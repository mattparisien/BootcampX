SELECT assignments.id, assignments.name, assignments.day, assignments.chapter, COUNT(assistance_requests.*) as total_assistances
FROM assignments
INNER JOIN assistance_requests ON assignments.id = assignment_id
GROUP BY assignments.id
ORDER BY total_assistances DESC;
