export const persons = ["ben", "sen", "o", "biz", "siz", "onlar"] as const;
export type Person = (typeof persons)[number];
export const tenses = {
  present: "Present continuous · -iyor",
  past: "Definite past · -di",
  future: "Future · -ecek",
  pastContinuous: "Past continuous · -iyordu",
  aorist: "General / habitual · -r",
  conditional: "Open conditional · -rse",
  hypothetical: "Hypothetical / wish · -se",
} as const;
export type Tense = keyof typeof tenses;
export type Form = {
  tense: Tense;
  person: Person;
  negative: boolean;
  ability: boolean;
};
export type Conjugation = {
  answer: string;
  accepted: string[];
  parts: string[];
  notes: string[];
  cue: string;
};
const vowels = "aeıioöuü";
const isVowel = (s: string) => vowels.includes(s.slice(-1));
const lastVowel = (s: string) =>
  [...s].reverse().find((c) => vowels.includes(c)) || "e";
const high = (s: string) =>
  ({ a: "ı", ı: "ı", e: "i", i: "i", o: "u", u: "u", ö: "ü", ü: "ü" })[
    lastVowel(s)
  ]!;
const low = (s: string) => ("aıou".includes(lastVowel(s)) ? "a" : "e");
const d = (s: string) => ("fstkçşhp".includes(s.slice(-1)) ? "t" : "d");
const soft = (s: string) =>
  new Set([
    "git",
    "et",
    "tat",
    "hisset",
    "kaybet",
    "affet",
    "reddet",
    "zannet",
    "seyret",
    "sabret",
  ]).has(s)
    ? s.slice(0, -1) + "d"
    : s;
const aoristI = new Set([
  "al",
  "bil",
  "bul",
  "dur",
  "gel",
  "gör",
  "kal",
  "ol",
  "öl",
  "san",
  "var",
  "ver",
  "vur",
]);
const stemOf = (v: string) => {
  if (!/(mak|mek)$/.test(v))
    throw Error("This entry is not a supported infinitive.");
  return v.slice(0, -3);
};
export function conjugate(infinitive: string, f: Form): Conjugation {
  if (f.ability && ["conditional", "hypothetical"].includes(f.tense))
    throw Error("Ability + conditional is reserved for a later version.");
  const words = infinitive.trim().toLocaleLowerCase("tr").split(/\s+/);
  const verb = words.pop()!;
  const prefix = words.length ? words.join(" ") + " " : "";
  if (!/^[a-zçğıöşüâîû]+$/.test(verb))
    throw Error("This spelling needs a checked conjugation rule.");
  let stem = stemOf(verb);
  if (!/[aeıioöuü]/.test(stem) || /[âîû]/.test(stem))
    throw Error("This stem needs a checked exception.");
  let base = stem;
  const parts = [prefix + stem];
  const notes: string[] = [];
  const p = persons.indexOf(f.person);
  const add = (s: string) => {
    base += s;
    parts.push(s);
  };
  const replace = (s: string) => {
    if (s !== base) {
      notes.push(`${base} → ${s} before a vowel suffix.`);
      base = s;
      parts[parts.length - 1] = s;
    }
  };
  if (f.ability) {
    if (!f.negative) {
      replace(stem === "de" ? "di" : stem === "ye" ? "yi" : soft(base));
      add((isVowel(base) ? "y" : "") + low(base) + "bil");
    } else {
      replace(stem === "de" ? "di" : stem === "ye" ? "yi" : soft(base));
      add((isVowel(base) ? "y" : "") + low(base));
    }
  }
  const neg = f.negative;
  let personal: "past" | "present" | "conditional" = "present";
  if (f.tense === "present" || f.tense === "pastContinuous") {
    if (neg) {
      add("m" + high(base) + "yor");
    } else if (isVowel(base)) {
      const shortened = base.slice(0, -1);
      const vowel =
        base === "de" || base === "ye" ? "i" : high(shortened || base);
      notes.push(`${base} loses its final vowel before -${vowel}yor.`);
      base = shortened;
      parts[parts.length - 1] = shortened;
      add(vowel + "yor");
    } else {
      replace(soft(base));
      add(high(base) + "yor");
    }
    if (f.tense === "pastContinuous") {
      if (p === 5) {
        add("lar");
        add("dı");
      } else add("du");
      personal = "past";
    }
  } else if (f.tense === "past") {
    if (neg) add("m" + low(base));
    add(d(base) + high(base));
    personal = "past";
  } else if (f.tense === "future") {
    if (neg) add("m" + low(base));
    else replace(base === "de" ? "di" : base === "ye" ? "yi" : soft(base));
    let suffix = (isVowel(base) ? "y" : "") + low(base) + "c" + low(base) + "k";
    if (p === 0 || p === 3) {
      suffix = suffix.slice(0, -1) + "ğ";
      notes.push(
        "Future -k becomes -ğ before a vowel-initial personal ending.",
      );
    }
    add(suffix);
  } else if (f.tense === "hypothetical") {
    if (neg) add("m" + low(base));
    add("s" + low(base));
    personal = "conditional";
  } else {
    // General ability and open conditionals use the aorist base.
    if (neg) {
      add("m" + low(base));
      if (f.tense === "conditional" || (p !== 0 && p !== 3)) add("z");
    } else if (isVowel(base)) add("r");
    else {
      const syllables = [...base].filter((c) => vowels.includes(c)).length;
      const ending =
        syllables > 1 || aoristI.has(base) ? high(base) : low(base);
      replace(soft(base));
      add(ending + "r");
    }
    if (f.tense === "conditional") {
      add("s" + low(base));
      personal = "conditional";
    }
  }
  if (personal === "past" || personal === "conditional") {
    const suffix = [
      "m",
      "n",
      "",
      "k",
      "n" + high(base) + "z",
      "l" + low(base) + "r",
    ][p];
    if (!(f.tense === "pastContinuous" && p === 5)) add(suffix);
  } else {
    const suffix = [
      "",
      "s" + high(base) + "n",
      "",
      "",
      "s" + high(base) + "n" + high(base) + "z",
      "l" + low(base) + "r",
    ][p];
    if (p === 0)
      add(
        f.tense === "aorist" && neg
          ? "m"
          : (isVowel(base) ? "y" : "") + high(base) + "m",
      );
    else if (p === 3) add((isVowel(base) ? "y" : "") + high(base) + "z");
    else add(suffix);
  }
  const answer = prefix + base;
  const accepted = [answer];
  if (p === 5) {
    if (f.tense === "pastContinuous") {
      accepted.push(prefix + base.replace(/lardı$/, "du"));
      accepted.push(prefix + base.replace(/lardı$/, "dular"));
    } else {
      accepted.push(prefix + base.replace(/l[ae]r$/, ""));
      if (f.tense === "conditional")
        accepted.push(prefix + base.replace(/s([ae])l([ae])r$/, "l$2rs$1"));
    }
    notes.push(
      "With an explicit onlar, both the singular-form predicate and plural agreement are accepted.",
    );
  }
  if (f.ability)
    notes.push(
      neg
        ? "Negative ability uses -(y)Ama-, not -ebilme-."
        : "Ability uses -(y)Abil- before the tense ending.",
    );
  if (f.tense === "conditional")
    notes.push(
      "Open condition: “if …”; this prompt uses the aorist + -se/-sa.",
    );
  if (f.tense === "hypothetical")
    notes.push(
      "Bare -se/-sa needs context: hypothetical condition or wish. It is not interchangeable with the open conditional.",
    );
  const subject = ["I", "You", "He/she", "We", "You", "They"][p];
  const beNow = ["am", "are", "is", "are", "are", "are"][p];
  const bePast = p === 0 || p === 2 ? "was" : "were";
  let phrase = "";
  if (f.ability) {
    if (f.tense === "past")
      phrase = `${bePast} ${neg ? "not " : ""}able to come`;
    else if (f.tense === "future")
      phrase = `will ${neg ? "not " : ""}be able to come`;
    else if (f.tense === "pastContinuous")
      phrase = `${bePast} ${neg ? "not " : ""}able to come (ongoing situation)`;
    else if (f.tense === "present")
      phrase = `${beNow} ${neg ? "not " : ""}able to come (right now)`;
    else phrase = neg ? "cannot come" : "can come";
  } else {
    const examples: Record<Tense, string> = {
      present: `${beNow} ${neg ? "not " : ""}coming`,
      past: neg ? "did not come" : "came",
      future: `will ${neg ? "not " : ""}come`,
      pastContinuous: `${bePast} ${neg ? "not " : ""}coming`,
      aorist: neg
        ? `${p === 2 ? "does" : "do"} not come`
        : p === 2
          ? "comes"
          : "come",
      conditional: neg
        ? `${p === 2 ? "does" : "do"} not come`
        : p === 2
          ? "comes"
          : "come",
      hypothetical: `were ${neg ? "not " : ""}to come`,
    };
    phrase = examples[f.tense];
  }
  const conditional = ["conditional", "hypothetical"].includes(f.tense);
  return {
    answer,
    accepted: [...new Set(accepted)],
    parts: parts.filter(Boolean),
    notes,
    cue: `Pattern example with “come”: ${conditional ? "If " + (p === 0 ? "I" : subject.toLowerCase()) : subject} ${phrase}.`,
  };
}
