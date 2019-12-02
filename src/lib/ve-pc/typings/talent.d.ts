
interface ITalentInfo {
  title: string;
  description: string;
}

interface ITalentLocaleInfo {
  [talent: string]: ITalentInfo;
}

interface ITalentDef {
  [level: number]: string[];
}

export { ITalentDef, ITalentInfo, ITalentLocaleInfo };
