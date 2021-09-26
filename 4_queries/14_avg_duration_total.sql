SELECT AVG(total_duration) average_total_duration
FROM (
  SELECT cohorts.name as cohort, SUM(completed_at - started_at) as total_duration
  FROM assistance_requests
  INNER JOIN students ON students.id = student_id
  INNER JOIN cohorts ON cohorts.id = cohort_id
  GROUP BY cohorts.name
  ORDER BY total_duration
) as total_durations


