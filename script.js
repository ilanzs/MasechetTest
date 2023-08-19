async function getSentence(masechet, daf, amud) {
  let response = await fetch(
    `https://www.sefaria.org/api/texts/${masechet}.${daf}${amud}`
  );
  let data = await response.json();
  return data;
}
let masechet;
let daf;
let amud;

let SubmitMasechet = () => {
  let value = document.querySelector("#masechtot").value.split(" ");
  let midaf = gematriyaLettersToNumbers(document.querySelector("#midaf").value);
  let adDaf = gematriyaLettersToNumbers(document.querySelector("#ad-daf").value)+1;

  masechet = value[0];
  let pages = value[1];



  
// Math. random() * (max-min) + min);
  daf = Math.floor(Math.random() * (adDaf-midaf) + midaf)
  if (daf == 1) {
    daf = 2;
  }

  console.log(daf)
  amud = Math.random() > 0.5 ? "a" : "b";

  getSentence(masechet, daf, amud).then((data) => {
    let newData = data.he.join("");
    let sentences = newData.split(".");
    let sentenceIndex = Math.floor(Math.random() * sentences.length);
    let sentence = sentences.slice(sentenceIndex, sentenceIndex + 2).join(".");
    if (sentence.split(" ").length > 35) {
      sentence = sentence.split(" ").slice(0, 35).join(" ");
    } else if (sentence.split(" ").length < 10) {
      sentence = sentences.slice(sentenceIndex, sentenceIndex + 3);
    }

    document.querySelector("#answer").style.display = 'none';
    document.querySelector("#before").style.display = "none";
    document.querySelector("#after").style.display = "inline";
    document.querySelector("#gmara").innerHTML = sentence;
    document.querySelector("#show").style.display = "inline";
  });
};

let show = () => {
    document.querySelector("#show").style.display = 'none';
    document.querySelector("#answer").style.display = 'inline'
    document.querySelector("#answerh1").innerHTML = `<a href="https://www.sefaria.org.il/${masechet}.${daf}${amud}" target="_blank">דף ${gematriyaNumToLetters(daf, {punctuate: false})}${amud == "a" ? "." : ":"}</a>`;
}


let back = () => {
    document.querySelector("#before").style.display = 'inline';
    document.querySelector("#after").style.display = 'none';
    document.querySelector("#answer").style.display = 'none';
}

let again = () => {
  SubmitMasechet();
}