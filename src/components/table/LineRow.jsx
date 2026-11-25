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
  const getPosition = (phrase, lineText, tooltipText) => {
    const phraseDetails = {};
    phraseDetails.start = lineText.toLowerCase().indexOf(phrase.toLowerCase());
    if (phraseDetails.start == -1) {
      console.log("ERROR: vocab item not found in string.");
      return;
    }
    phraseDetails.end = phraseDetails.start + phrase.length;
    console.log(`Building tooltip: ${tooltipText}`);
    phraseDetails.text = tooltipText;
    phraseDetails.type = "tooltip";
    return phraseDetails;
  };

  const buildTooltip = (tooltipText, lineText, tooltipObj) => {
    const tooltip = (
      <Tooltip key={tooltipObj.start} text={`${tooltipText}`} text2={tooltipObj.comment}>
        {lineText.slice(tooltipObj.start, tooltipObj.end + 1)}
      </Tooltip>
    );
    return tooltip;
  };

  const getSpans = (line, tooltipList) => {
    const spans = [];
    let startIndex = 0;
    for (let t of tooltipList) {
      let text = line.text.slice(startIndex, t.start);
      if (text) {
        spans.push({
          text: <span key={startIndex}>{text}</span>,
          start: startIndex,
          end: startIndex + text.length,
          type: "span",
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
    const tooltipDetails = [];
    line.vocabReferences.forEach((v) =>
      tooltipDetails.push(
        getPosition(
          v.instance,
          line.text,
          `V: ${v.vocab.lemma} = ${v.vocab.definition}`,
        ),
      ),
    );
    line.comments.forEach((c, i) => {
      let commentObj = getPosition(c.reference, line.text, c.note);
      let currentObj = tooltipDetails.find(
        (t) => t.start == commentObj.start && t.end == commentObj.end,
      );
      if (currentObj) {
        tooltipDetails[i].comment = `C: ${c.note}`;
      } else {
        tooltipDetails.push(getPosition(c.reference, line.text, c.note));
      }
    });

    tooltipDetails.sort((a, b) => a.start - b.start);
    const spans = getSpans(line, tooltipDetails);
    const lineArray = tooltipDetails.concat(spans);
    return lineArray.sort((a, b) => a.start - b.start);
  };

  return (
    <tr>
      <td>{line.number}</td>
      <td>
        {line.vocabReferences.length > 0 || line.comments.length > 0
          ? buildLine(line).map((it) =>
              it.type == "tooltip"
                ? buildTooltip(it.text, line.text, it)
                : it.text,
            )
          : line.text}
      </td>
      <td>
        <a className="text-blue-600 underline" href={`/vocab/add/${line.id}`}>
          Add vocab
        </a>
        &nbsp;
        <a
          className="text-blue-600 underline"
          href={`/comments/add/${line.id}`}
        >
          Add comment
        </a>
      </td>
    </tr>
  );
}
