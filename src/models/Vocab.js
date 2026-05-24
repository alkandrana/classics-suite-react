export class Vocab {

    lemma = "";
    definition = "";
    pos = "";
    languageId = 0;

    constructor(entry, def, pos, languageId) {
        this.lemma = entry;
        this.definition = def;
        this.pos = pos;
        this.languageId = languageId;
    }
}