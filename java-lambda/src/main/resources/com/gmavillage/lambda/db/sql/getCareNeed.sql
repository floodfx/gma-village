SELECT c.id, c.parent_id, c.care_locations, c.timezone_name,
       c.neighborhood_id, c.other_neighborhood, c.start_time, 
       c.end_time, c.delivery_status,
       n.name as neighborhood_name, n.label as neighborhood_label,
       n.city_id, y.name as city_name, y.label as city_label, y.state as city_state
from careneeds as c, neighborhoods as n, cities as y
WHERE
  c.neighborhood_id = n.id
  AND
  n.city_id = y.id
  AND
  c.id=:id