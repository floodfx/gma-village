SELECT c.id, c.first_name, c.dob, c.note
FROM children as c, careneedschildren n
WHERE
  c.id = n.child_id
  AND
  n.careneed_id = :careneed_id