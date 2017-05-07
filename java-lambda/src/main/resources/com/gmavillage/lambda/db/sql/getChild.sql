SELECT c.id, c.first_name, c.dob, c.note
FROM children as c
WHERE
  c.id = :id