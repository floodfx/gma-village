with insertu as
  (insert into users
    (
      id, first_name, last_name, phone, user_type, active, profile_image_url,
      account_kit_access_token, account_kit_user_id, account_kit_access_token_expires_at,
      accepted_terms, created_by_user
    )
      values
    (
      default, :firstName, :lastName, :phone, :userType::user_type, :active, :profileImageUrl,
      :accountKitAccessToken, :accountKitUserId, :accountKitAccessTokenExpiresAt,
      :acceptedTerms, :createdByUser
    )
    returning *
  ),
inparents as
  (insert into parents
    (
      user_id, need_recurrence, need_time_of_day, other_need_time_of_day, need_locations,
      neighborhood_id, other_neighborhood, why_join, additional_info
    )
    values
    (
      (select insertu.id from insertu), :needRecurrence::recurrence_types[],
      :needTimeOfDay::time_of_day_types[], :otherNeedTimeOfDay,
      :needLocations::care_location_types[], :neighborhoodId,
      :otherNeighborhood, :whyJoin, :additionalInfo
    )
    returning *
  )
select insertu.id, insertu.first_name, insertu.last_name, insertu.phone, insertu.user_type,
       insertu.active, insertu.profile_image_url, insertu.account_kit_access_token,
       insertu.account_kit_user_id, insertu.account_kit_access_token_expires_at,
       insertu.accepted_terms, insertu.created_by_user, insertu.created_on, insertu.updated_at,
       inparents.need_recurrence, inparents.need_time_of_day,
       inparents.other_need_time_of_day, need_locations,
       (select coalesce(inparents.neighborhood_id, 1) as neighborhood_id), inparents.other_neighborhood,
       inparents.why_join, inparents.additional_info,
       n.name as neighborhood_name, n.label as neighborhood_label,
       n.city_id, c.name as city_name, c.label as city_label, c.state as city_state
FROM insertu, inparents
  LEFT OUTER JOIN 
    neighborhoods as n
  ON neighborhood_id = n.id
  LEFT OUTER JOIN
    cities as c
  ON n.city_id = c.id