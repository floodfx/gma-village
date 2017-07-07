SELECT u.id, u.first_name, u.last_name, u.phone, u.user_type, u.active,
       u.profile_image_url, u.account_kit_access_token, u.account_kit_user_id,
       u.account_kit_access_token_expires_at, u.accepted_terms, u.created_by_user,
       u.created_on, u.updated_at,
       p.need_recurrence, p.need_time_of_day,
       p.other_need_time_of_day, p.need_locations,
       p.neighborhood_id, p.other_neighborhood, p.why_join, p.additional_info,
       n.name as neighborhood_name, n.label as neighborhood_label,
       n.city_id, c.name as city_name, c.label as city_label, c.state as city_state
FROM users as u, parents as p
  LEFT OUTER JOIN 
    neighborhoods as n
  ON p.neighborhood_id = n.id
  LEFT OUTER JOIN
    cities as c
  ON n.city_id = c.id
WHERE
  (u.deleted=false or u.deleted=:deleted)
  AND
  u.user_type = 'PARENT'
  AND
  u.id = :user_id
  AND
  p.user_id = :user_id