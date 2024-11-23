const savedProfilesData = [
  {
    personalInfo: {
      fullName: "Chris Topher",
      phoneNumber: "123-456-7890",
      dateOfBirth: "1990-01-15",
      gender: "Male",
      relationshipToUser: "Myself",
      image: require("@/assets/images/ProfilePhotos/pfp1.png"),
    },
    address: {
      streetAddress: "123 Elm Street",
      postalCode: "A1B 2C3",
      province: "British Columbia",
      city: "Vancouver",
    },
    emergencyContact: {
      fullName: "Jane Doe",
      phoneNumber: "098-765-4321",
      email: "jane.doe@example.com",
      relationshipToProfile: "Friend",
    },
  },
  {
    personalInfo: {
      fullName: "Sarah O'Neil",
      phoneNumber: "234-567-8901",
      dateOfBirth: "1965-05-20",
      gender: "Female",
      relationshipToUser: "Care Recipient",
      image: require("@/assets/images/ProfilePhotos/pfp2.png"),
    },
    address: {
      streetAddress: "456 Maple Drive",
      postalCode: "D4E 5F6",
      province: "Alberta",
      city: "Calgary",
    },
    emergencyContact: {
      fullName: "John O'Neil",
      phoneNumber: "876-543-2109",
      email: "john.oneil@example.com",
      relationshipToProfile: "Husband",
    },
  },
  {
    personalInfo: {
      fullName: "Pat Rick",
      phoneNumber: "345-678-9012",
      dateOfBirth: "1942-08-12",
      gender: "Male",
      relationshipToUser: "Grandfather",
      image: require("@/assets/images/ProfilePhotos/pfp3.png"),
    },
    address: {
      streetAddress: "789 Oak Lane",
      postalCode: "G7H 8I9",
      province: "Ontario",
      city: "Toronto",
    },
    emergencyContact: {
      fullName: "Lisa Rick",
      phoneNumber: "765-432-1098",
      email: "lisa.rick@example.com",
      relationshipToProfile: "Daughter",
    },
  },
];

export default savedProfilesData;
