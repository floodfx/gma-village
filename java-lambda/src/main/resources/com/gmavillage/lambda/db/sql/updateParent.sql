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
       updatep.neighborhood_id, updatep.other_neighborhood,
       updatep.why_join, updatep.additional_info
from updateu, updatep
