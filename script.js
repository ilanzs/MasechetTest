async function getSentence(masechet, daf, amud) {
  let response = await fetch(
    `https://www.sefaria.org/api/texts/${masechet}.${daf}${amud}`
  );
  console.log(`https://www.sefaria.org/api/texts/${masechet}.${daf}.${amud}`)
  // let response = await fetch("https://www.sefaria.org/api/texts/Yoma.2.a");
  let data = await response.json();
  return data;
}
let masechet;
let daf;
let amud;

let SubmitMasechet = () => {
  let value = document.querySelector("#masechtot").value.split(" ");
  masechet = value[0];
  let pages = value[1];

  daf = Math.floor(Math.random() * pages);
  amud = Math.random() > 0.5 ? "a" : "b";

  console.log(daf);
  console.log(amud);

  getSentence(masechet, daf, amud).then((data) => {
    let newData = data.he.join("");
    let sentences = newData.split(".");
    let sentenceIndex = Math.floor(Math.random() * sentences.length);
    let sentence = sentences.slice(sentenceIndex, sentenceIndex + 2).join(".");

    document.querySelector("#before").style.visibility = "hidden";
    document.querySelector("#after").style.visibility = "visible";
    document.querySelector("#gmara").innerHTML = sentence;
    document.querySelector("#show").style.visibility = "visible";
  });
};

let show = () => {
    document.querySelector("#show").style.visibility = 'hidden';
    document.querySelector("#answer").style.visibility = 'visible'
    document.querySelector("#answerh1").innerHTML = `דף ${gematriya(daf, {punctuate: false})}${amud == "a" ? "." : ":"}`;
}


let back = () => {
    document.querySelector("#before").style.visibility = 'visible';
    document.querySelector("#after").style.visibility = 'hidden';
    document.querySelector("#answer").style.visibility = 'hidden';
}