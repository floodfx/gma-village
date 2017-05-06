SELECT u.id, u.first_name, u.last_name, u.phone, u.user_type, u.active,
       u.profile_image_url, u.account_kit_access_token, u.account_kit_user_id,
       u.account_kit_access_token_expires_at, u.accepted_terms, u.created_by_user,
       u.created_on, u.updated_at,
       g.availabilities, g.other_availability,
       g.care_ages, g.care_experiences,
       g.other_care_experience, g.care_locations,
       g.demeanors, g.other_demeanor,
       g.care_trainings, g.neighborhood_id, g.other_neighborhood,
       g.available_outside_neighborhood, g.why_care_for_kids, g.additional_info,
       n.name as neighborhood_name, n.label as neighborhood_label,
       n.city_id, c.name as city_name, c.label as city_label, c.state as city_state
FROM users as u, gmas as g, neighborhoods as n, cities as c
WHERE
  (u.deleted=false or u.deleted=:deleted)
  AND
  u.user_type = 'GMA'
  AND
  u.id = :user_id
  AND
  g.user_id = :user_id
  AND
  g.neighborhood_id = n.id
  AND
  n.city_id = c.id