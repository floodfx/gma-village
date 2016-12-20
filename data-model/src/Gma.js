var User = require('./User')

class Gma extends User {
  constructor(
    id,
    first_name,
    last_name,
    phone,
    active,
    ak_access_token,
    ak_user_id,
    ak_token_refresh_interval_sec,
    ak_token_last_renewed_timestamp,
    last_login_timestamp,
    created_on_timestamp,
    member_since_timestamp,
    availabilities,
    otherAvailability,
    careAges,
    careExperiences,
    otherCareExperience,
    careLocations,
    careTrainings,
    otherCareTraining,
    city,
    demeanors,
    otherDemeanor,
    neighborhood,
    otherNeighborhood,
    isAvailableOutsideNeighborhood,
    whyCareForKidsText,
    additionalInformationText,
    profilePhotoUrl
  ) {
    super(
      id,
      first_name,
      last_name,
      phone,
      "Gma",
      active,
      ak_access_token,
      ak_user_id,
      ak_token_refresh_interval_sec,
      ak_token_last_renewed_timestamp,
      last_login_timestamp,
      created_on_timestamp,
      member_since_timestamp,
      profilePhotoUrl
    )
    this.availabilities = availabilities;
    this.otherAvailability = otherAvailability;
    this.careAges = careAges;
    this.careExperiences = careExperiences;
    this.otherCareExperience = otherCareExperience;
    this.careLocations = careLocations;
    this.careTrainings = careTrainings;
    this.otherCareTraining = otherCareTraining;
    this.city = city;
    this.demeanors = demeanors;
    this.otherDemeanor = otherDemeanor;
    this.neighborhood = neighborhood;
    this.otherNeighborhood = otherNeighborhood;
    this.isAvailableOutsideNeighborhood = isAvailableOutsideNeighborhood;
    this.whyCareForKidsText = whyCareForKidsText;
    this.additionalInformationText = additionalInformationText;
    this.profilePhotoUrl = profilePhotoUrl;
  }

  toString() {
    return `
      Gma\n
      ${super.toString()}
      availabilities\t${this.availabilities}\n
      otherAvailability\t${this.otherAvailability}\n
      careAges\t${this.careAges}\n
      careExperiences\t${this.careExperiences}\n
      otherCareExperience\t${this.otherCareExperience}\n
      careLocations\t${this.careLocations}\n
      careTrainings\t${this.careTrainings}\n
      otherCareTraining\t${this.otherCareTraining}\n
      city\t${this.city}\n
      demeanors\t${this.demeanors}\n
      otherDemeanor\t${this.otherDemeanor}\n
      neighborhood\t${this.neighborhood}\n
      otherNeighborhood\t${this.otherNeighborhood}\n
      isAvailableOutsideNeighborhood\t${this.isAvailableOutsideNeighborhood}\n
      whyCareForKidsText\t${this.whyCareForKidsText}\n
      additionalInformationText\t${this.additionalInformationText}\n
      profilePhotoUrl\t${this.profilePhotoUrl}\n
    `
  }
}

module.exports = Gma
