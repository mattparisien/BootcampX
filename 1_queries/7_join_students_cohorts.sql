SELECT students.name, email, cohorts.name
FROM students RIGHT OUTER JOIN cohorts 
ON students.cohort_id = cohorts.id