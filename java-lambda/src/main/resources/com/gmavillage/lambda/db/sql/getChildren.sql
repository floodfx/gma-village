SELECT c.first_name, c.dob, c.note
FROM children as c
WHERE
  c.parent_id = :parent_id