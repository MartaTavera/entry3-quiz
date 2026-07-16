export function checkAnswer(q, a) {
  let correct = false;
  let userDisplay = "";

  switch (q.type) {
    case "number": {
      correct = q.check
        ? q.check(a.input)
        : Number.isInteger(q.answer)
          ? parseInt(a.input) === q.answer
          : Math.abs(parseFloat(a.input) - q.answer) < 0.01;
      userDisplay = a.input;
      break;
    }
    case "text": {
      const norm = q.normalize ? q.normalize(a.input) : a.input.trim();
      correct = q.check ? q.check(norm) : norm === q.answer;
      userDisplay = a.input;
      break;
    }
    case "choice": {
      correct = a.selected === q.answer;
      userDisplay = a.selected;
      break;
    }
    case "yesno": {
        const yesNoOk = a.yesNo === q.answer;
        const justifyOk = q.justifyPrompt
          ? (q.justifyCheck ? q.justifyCheck(a.justify) : parseFloat(a.justify) === q.justifyAnswer)
          : true;
        correct = yesNoOk && justifyOk;
        userDisplay = q.justifyPrompt ? `${a.yesNo} (${a.justify})` : a.yesNo;
        break;      
    }
    case "parcel": {
      correct = a.selected === q.answer;
      userDisplay = a.selected ? a.selected.replace("/", " cm / ") + " kg" : "";
      break;
    }
    case "twonumber": {
      const v1 = parseInt(a.input), v2 = parseInt(a.input2);
      correct = v1 === q.answer[0] && v2 === q.answer[1];
      userDisplay = `${a.input} documents, ${a.input2} sheets`;
      break;
    }
    default:
      break;
  }

  return { correct, userDisplay };
}