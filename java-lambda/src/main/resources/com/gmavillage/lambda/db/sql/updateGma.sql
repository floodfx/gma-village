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
updateg as
  (update gmas set 
    availabilities=:availabilities::time_of_day_types[],
    other_availability=:otherAvailability,
    care_ages=:careAges::care_age_types[],
    care_experiences=:careExperiences::care_experience_types[],
    other_care_experience=:otherCareExperience,
    care_locations=:careLocations::care_location_types[],
    demeanors=:demeanors::demeanor_types[],
    other_demeanor=:otherDemeanor,
    care_trainings=::careTrainings::VARCHAR[],
    neighborhood_id=:neighborhoodId,
    other_neighborhood=:otherNeighborhood,
    available_outside_neighborhood=:availableOutsideNeighborhood,
    why_care_for_kids=:whyCareForKids,
    additional_info=:additionalInfo
  where
    user_id=:id
    returning *
  )
select updateu.id, updateu.first_name, updateu.last_name, updateu.phone, updateu.user_type,
       updateu.active, updateu.profile_image_url, updateu.account_kit_access_token,
       updateu.account_kit_user_id, updateu.account_kit_access_token_expires_at,
       updateu.accepted_terms, updateu.created_by_user, updateu.created_on, updateu.updated_at,
       updateg.availabilities, updateg.other_availability,
       updateg.care_ages, updateg.care_experiences,
       updateg.other_care_experience, updateg.care_locations,
       updateg.demeanors, updateg.other_demeanor,
       updateg.care_trainings, updateg.neighborhood_id,
       updateg.other_neighborhood, updateg.available_outside_neighborhood,
       updateg.why_care_for_kids, updateg.additional_info
from updateu, updateg
