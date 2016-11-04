

class Gma {
  constructor({
    first_name,
    last_name,
    phone,
    neighborhood,
    isAvailableOutsideNeightborhood,
    careAges,
    availabilities,
    careLocations,
    demeanors,
    whyCareForKidsText,
    careExperiences,
    careTrainings,
    additionalInformationText
  }) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone = phone;
    this.isAvailableOutsideNeightborhood = isAvailableOutsideNeightborhood;
    this.careAges = careAges;
    this.availabilities = availabilities;
    this.careLocations = careLocations;
    this.demeanors = demeanors;
    this.whyCareForKidsText = whyCareForKidsText;
    this.careExperiences = careExperiences;
    this.careTrainings = careTrainings;
    this.additionalInformationText = additionalInformationText;
  }

  toString() {
    return `
      Gma\n
      first name\t${this.first_name}\n
      last name\t${this.last_name}\n
      phone\t${this.phone}\n
      isAvailableOutsideNeightborhood\t${this.isAvailableOutsideNeightborhood}\n
      careAges\t${this.careAges}\n
      availabilities\t${this.availabilities}\n
      careLocations\t${this.careLocations}\n
      demeanors\t${this.demeanors}\n
      whyCareForKidsText\t${this.whyCareForKidsText}\n
      careExperiences\t${this.careExperiences}\n
      careTrainings\t${this.careTrainings}\n
      additionalInformationText\t${this.additionalInformationText}\n
    `
  }
}

module.exports = Gma
