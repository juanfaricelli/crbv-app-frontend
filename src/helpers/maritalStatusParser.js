export const maritalStatusParser = (maritalStatusValue, update = false) => {
  if (update) {
    const statusMap = {
      "Soltero/a": "single",
      "Casado/a": "married",
      "Divorciado/a": "divorced",
      "Viudo/a": "widowed",
      Concubinato: "cohabiting",
      "Union Civil": "civil_union",
    };

    const statusKey = statusMap[maritalStatusValue] || maritalStatusValue;

    return {
      single: statusKey === "single",
      married: statusKey === "married",
      divorced: statusKey === "divorced",
      widowed: statusKey === "widowed",
      cohabiting: statusKey === "cohabiting",
      civil_union: statusKey === "civil_union",
    };
  } else {
    const truthyValue = Object.entries(maritalStatusValue).find((valuePair) => {
      if (valuePair[1]) return valuePair;
    });
    switch (truthyValue[0]) {
      case "single":
        return "Soltero/a";
      case "married":
        return "Casado/a";
      case "divorced":
        return "Divorciado/a";
      case "widowed":
        return "Viudo/a";
      case "cohabiting":
        return "Concubinato";
      case "civil_union":
        return "Union Civil";
      default:
        break;
    }
  }
};
