SELECT u.id, u.first_name, u.last_name, u.phone, u.user_type, u.active,
       u.profile_image_url, u.account_kit_access_token, u.account_kit_user_id,
       u.account_kit_access_token_expires_at, u.accepted_terms, u.created_by_user,
       u.created_on, u.updated_at,
       to_json(g.availabilities) as availabilities, g.other_availability,
       to_json(g.care_ages) as care_ages, to_json(g.care_experiences) as care_experiences,
       g.other_care_experience, to_json(g.care_locations) as care_locations,
       to_json(g.demeanors) as demeanors, g.other_demeanor,
       to_json(g.care_trainings) as care_trainings, g.neighborhood_id, g.other_neighborhood,
       g.available_outside_neighborhood, g.why_care_for_kids, g.additional_info
FROM users as u, gmas as g
WHERE
  (u.deleted=false or u.deleted=:deleted)
  AND
  u.user_type = 'gma'
  AND
  u.id = $1
  AND
  g.user_id = :user_id