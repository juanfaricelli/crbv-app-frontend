export const genderParser = (genderValue, update = false) => {
  if (update) {
    const genderMap = {
      Hombre: "male",
      Mujer: "female",
      "No Binario": "nonbinary",
      Transgenero: "transgender",
      "Prefiero no decir/Otros": "other",
    };

    const genderKey = genderMap[genderValue] || genderValue;

    return {
      male: genderKey === "male",
      female: genderKey === "female",
      nonbinary: genderKey === "nonbinary",
      transgender: genderKey === "transgender",
      other: genderKey === "other",
    };
  } else {
    const truthyValue = Object.entries(genderValue).find((valuePair) => {
      if (valuePair[1]) return valuePair;
    });
    switch (truthyValue[0]) {
      case "male":
        return "Hombre";
      case "female":
        return "Mujer";
      case "nonbinary":
        return "No Binario";
      case "transgender":
        return "Transgenero";
      case "other":
        return "Prefiero no decir/Otros";
      default:
        break;
    }
  }
};
