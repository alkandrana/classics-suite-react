import Tooltip from "../ui/Tooltip";
export default function LineRow({ line }) {
  /*  Algorithm: find position of vocab instance and apply a tooltip to the relevant text*/
  //  NOTE: can't concatenate because React components are Javascript objects.

  /* 1. find index position of vocab item (using line.vocabReferences[x].instance to search)
   * 2. construct Tooltip using info from vocab object (line.vocabReferences[x].vocab)
   * 3. build list of vocab tooltips
   * 4. build list of non-vocab sections as <span></span> elements
   * 5. join lists and sort by startIndex, so that each element will occur in the original order of the text
   * 6. In JSX, map over completed list
   */
  console.log("In Line component: ", line);
  const getPosition = (vocabInstance, lineText, vocabObj) => {
    const vocabDetails = {};
    vocabDetails.start = lineText
      .toLowerCase()
      .indexOf(vocabInstance.toLowerCase());
    if (vocabDetails.start == -1) {
      console.log("ERROR: vocab item not found in string.");
      return;
    }
    vocabDetails.end = vocabDetails.start + vocabInstance.length;

    const tooltip = buildTooltip(vocabObj, lineText, vocabDetails);
    console.log("Tooltip built: ", tooltip);
    vocabDetails.text = tooltip;
    return vocabDetails;
  };

  const buildTooltip = (vocabObj, lineText, tooltipObj) => {
    const tooltip = (
      <Tooltip
        key={tooltipObj.start}
        text={`${vocabObj.lemma} = ${vocabObj.definition}`}
      >
        {lineText.slice(tooltipObj.start, tooltipObj.end + 1)}
      </Tooltip>
    );
    return tooltip;
  };

  const getVocabTooltips = (line) => {
    const vocab = [];
    for (let v of line.vocabReferences) {
      vocab.push(getPosition(v.instance, line.text, v.vocab));
    }
    return vocab;
  };

  const getSpans = (line, vocabTooltips) => {
    const spans = [];
    let startIndex = 0;
    for (let t of vocabTooltips) {
      let text = line.text.slice(startIndex, t.start);
      if (text) {
        spans.push({
          text: <span key={startIndex}>{text}</span>,
          start: startIndex,
          end: startIndex + text.length,
        });
      }
      startIndex = t.end;
    }
    if (startIndex < line.text.length - 1) {
      let text = line.text.slice(startIndex, line.length);
      spans.push({
        text: <span key={startIndex}>{text}</span>,
        start: startIndex,
        end: startIndex + text.length,
      });
    }
    return spans;
  };

  const buildLine = (line) => {
    const vocabTooltips = getVocabTooltips(line);
    const spans = getSpans(line, vocabTooltips);
    const lineArray = vocabTooltips.concat(spans);
    return lineArray.sort((a, b) => a.start - b.start);
  };

  return (
    <tr>
      <td>{line.number}</td>
      <td>
        {line.vocabReferences.length > 0
          ? buildLine(line).map((it) => it.text)
          : line.text}
      </td>
      <td>
        <a className="text-blue-600 underline" href={`/vocab/add/${line.id}`}>
          Add vocab
        </a>
      </td>
    </tr>
  );
}
