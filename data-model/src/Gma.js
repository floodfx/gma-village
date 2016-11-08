

class Gma {
  constructor(
    id,
    first_name,
    last_name,
    phone,
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
    additionalInformationText
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone = phone;
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
    this.isAvailableOutsideNeightborhood = isAvailableOutsideNeightborhood;
    this.whyCareForKidsText = whyCareForKidsText;
    this.additionalInformationText = additionalInformationText;
  }

  toString() {
    return `
      Gma\n
      id\t${this.id}\n
      first name\t${this.first_name}\n
      last name\t${this.last_name}\n
      phone\t${this.phone}\n
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
      isAvailableOutsideNeightborhood\t${this.isAvailableOutsideNeightborhood}\n
      whyCareForKidsText\t${this.whyCareForKidsText}\n
      additionalInformationText\t${this.additionalInformationText}\n
    `
  }
}

module.exports = Gma
