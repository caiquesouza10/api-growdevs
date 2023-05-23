import { Growdev } from "../models/growdever";
import { Skill } from "../models/skill.model";

export const growdeversDb = [
    new Growdev('Caique', 29),
    new Growdev('Kelly', 27),
    new Growdev('Agnes', 1),
    new Growdev('Matteo', 1)
];

growdeversDb[0].skills.push(new Skill("node.js", true));
growdeversDb[0].skills.push(new Skill("backend", true));
growdeversDb[1].skills.push(new Skill("react", true));
growdeversDb[1].skills.push(new Skill("node.js", false));

