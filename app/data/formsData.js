import { typography } from "@/css/globals";

const formsData = [
  {
    id: 1,
    title: "Canadian Pension Plan",
    description: "Apply for monthly retirement income from CPP.",
    image: require("@/assets/images/FormCovers/previewPension.png"),
    height: 304,
  },
  {
    id: 2,
    title: "Don't see the form you're looking for?",
    description: "Try our scan feature to upload a physical form!",
    height: 196,
    font: { ...typography(true).h2Med },
  },
  {
    id: 3,
    title: "Disability Tax Credit",
    description: "Apply for a tax credit for individuals with disabilities.",
    image: require("@/assets/images/FormCovers/previewDisability.png"),
    height: 304,
  },
  {
    id: 4,
    title: "Assisted Living Application",
    description: "Request access to assisted living or long-term care.",
    image: require("@/assets/images/FormCovers/previewAssisted.png"),
    height: 304,
  },
  {
    id: 5,
    title: "Assisted Living Application",
    description: "Request access to assisted living or long-term care.",
    image: require("@/assets/images/FormCovers/previewAssisted.png"),
    height: 304,
  },
  {
    id: 6,
    title: "Canadian Pension Plan",
    description: "Apply for monthly retirement income from CPP.",
    image: require("@/assets/images/FormCovers/previewPension.png"),
    height: 304,
  },
];

export default formsData;