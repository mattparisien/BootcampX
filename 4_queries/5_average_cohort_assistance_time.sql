SELECT cohorts.name, AVG(completed_at - started_at) as average_assistance_time
FROM cohorts
INNER JOIN students ON cohort_id = cohorts.id
INNER JOIN assistance_requests ON student_id = students.id
GROUP BY cohorts.name
ORDER BY average_assistance_time;

