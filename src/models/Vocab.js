export class Vocab {

    lemma = "";
    definition = "";
    partOfSpeech = "";
    languageId = 0;

    constructor(entry, def, pos, languageId) {
        this.lemma = entry;
        this.definition = def;
        this.partOfSpeech = pos;
        this.languageId = languageId;
    }
}