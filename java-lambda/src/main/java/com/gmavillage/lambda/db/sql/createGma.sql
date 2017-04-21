with insertu as
  (insert into users
    (
      id, first_name, last_name, phone, user_type, active, profile_image_url,
      account_kit_access_token, account_kit_user_id, account_kit_access_token_expires_at,
      accepted_terms, created_by_user
    )
      values
    (
      default, :firstName, :lastName, :phone, :userType, :active, :profileImageUrl,
      :accountKit_accessToken, :accountKitUserId, :accountKitAccessTokenExpiresAt,
      :acceptedTerms, :createdByUser
    )
    returning *
  ),
ingmas as
  (insert into gmas
    (
      user_id, availabilities, other_availability, care_ages, care_experiences,
      other_care_experience, care_locations, demeanors, other_demeanor,
      care_trainings, neighborhood_id, other_neighborhood,
      available_outside_neighborhood, why_care_for_kids, additional_info
    )
    values
    (
      (select insertu.id from insertu), :availabilities::time_of_day_types[],
      :otherAvailability, :careAges::care_age_types[],
      :careExperiences::care_experience_types[], :otherCareExperience,
      :careLocations::care_location_types[], :demeanors::demeanor_types[],
      :otherDemeanor, :care_trainings::VARCHAR[], :neighborhoodId,
      :otherNeighborhood, :availableOutsideNeighborhood,
      :whyCareForKids, :additionalInfo
    )
    returning *
  )
select insertu.id, insertu.first_name, insertu.last_name, insertu.phone, insertu.user_type,
       insertu.active, insertu.profile_image_url, insertu.account_kit_access_token,
       insertu.account_kit_user_id, insertu.account_kit_access_token_expires_at,
       insertu.accepted_terms, insertu.created_by_user, insertu.created_on, insertu.updated_at,
       to_json(ingmas.availabilities) as availabilities, ingmas.other_availability,
       to_json(ingmas.care_ages) as care_ages, to_json(ingmas.care_experiences) as care_experiences,
       ingmas.other_care_experience, to_json(ingmas.care_locations) as care_locations,
       to_json(ingmas.demeanors) as demeanors, ingmas.other_demeanor,
       to_json(ingmas.care_trainings) as care_trainings, ingmas.neighborhood_id,
       ingmas.other_neighborhood, ingmas.available_outside_neighborhood,
       ingmas.why_care_for_kids, ingmas.additional_info
from insertu, ingmas