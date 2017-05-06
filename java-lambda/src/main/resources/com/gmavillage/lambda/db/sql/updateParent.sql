with updateu as
  (update users set 
    first_name=:firstName,
    last_name=:lastName,
    phone=:phone,
    active=:active,
    profile_image_url=:profileImageUrl,
    account_kit_access_token=:accountKitAccessToken,
    account_kit_access_token_expires_at=:accountKitAccessTokenExpiresAt,
    accepted_terms=:acceptedTerms,
    updated_at=default
  where
    id=:id
      and
    deleted=false 
    returning *
  ),
updatep as
  (update parents set 
    need_recurrence=:needRecurrence::recurrence_types[],
    need_time_of_day=:needTimeOfDay::time_of_day_types[],
    other_need_time_of_day=:otherNeedTimeOfDay,
    need_locations=:needLocations::care_location_types[],
    neighborhood_id=:neighborhoodId,
    other_neighborhood=:otherNeighborhood,
    why_join=:whyJoin,
    additional_info=:additionalInfo
  where
    user_id=:id
    returning *
  )
select updateu.id, updateu.first_name, updateu.last_name, updateu.phone, updateu.user_type,
       updateu.active, updateu.profile_image_url, updateu.account_kit_access_token,
       updateu.account_kit_user_id, updateu.account_kit_access_token_expires_at,
       updateu.accepted_terms, updateu.created_by_user, updateu.created_on, updateu.updated_at,
       updatep.need_recurrence, updatep.need_time_of_day,
       updatep.other_need_time_of_day, need_locations,
       (select coalesce(updatep.neighborhood_id, 1) as neighborhood_id), updatep.other_neighborhood,
       updatep.why_join, updatep.additional_info,
       n.name as neighborhood_name, n.label as neighborhood_label,
       n.city_id, c.name as city_name, c.label as city_label, c.state as city_state
FROM updateu, updatep, neighborhoods as n, cities as c
WHERE
  neighborhood_id = n.id
  AND
  n.city_id = c.id
