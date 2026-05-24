export class VocabInstance {
    instance = "";
    form = "";
    citation = "";
    vocabId = 0;

    constructor(inst, parse, cite, voc) {
        this.instance = inst;
        this.form = parse;
        this.citation = cite;
        this.vocabId = voc;
    }
}