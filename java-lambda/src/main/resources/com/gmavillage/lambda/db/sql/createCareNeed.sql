with insertcareneeds as
  (insert into careneeds
    (
      id, parent_id, care_locations, timezone_name, neighborhood_id, other_neighborhood,
      start_time, end_time, delivery_status
    )
      values
    (
      default, :parentId, :careLocations::care_location_types[], :timezoneName,
      :neighborhoodId, :otherNeighborhood, :startTime, :endTime, :deliveryStatus
    )
    returning *
  )
select insertcareneeds.id, insertcareneeds.parent_id, insertcareneeds.care_locations, insertcareneeds.timezone_name,
       insertcareneeds.neighborhood_id, insertcareneeds.other_neighborhood, insertcareneeds.start_time, 
       insertcareneeds.end_time, insertcareneeds.delivery_status,
       n.name as neighborhood_name, n.label as neighborhood_label,
       n.city_id, c.name as city_name, c.label as city_label, c.state as city_state
from insertcareneeds, neighborhoods as n, cities as c
WHERE
  insertcareneeds.neighborhood_id = n.id
  AND
  n.city_id = c.id