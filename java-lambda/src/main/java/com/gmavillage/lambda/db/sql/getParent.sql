SELECT u.id, u.first_name, u.last_name, u.phone, u.user_type, u.active,
       u.profile_image_url, u.account_kit_access_token, u.account_kit_user_id,
       u.account_kit_access_token_expires_at, u.accepted_terms, u.created_by_user,
       u.created_on, u.updated_at,
       to_json(p.need_recurrence) as need_recurrence, to_json(p.need_time_of_day) as need_time_of_day,
       p.other_need_time_of_day, to_json(p.need_locations) as need_locations,
       p.neighborhood_id, p.other_neighborhood, p.why_join, p.additional_info
FROM users as u, parents as p
WHERE
  (u.deleted=false or u.deleted=:deleted)
  AND
  u.user_type = 'parent'
  AND
  u.id = $1
  AND
  p.user_id = :user_id