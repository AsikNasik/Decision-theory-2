let classNameSections = document.querySelector(".name_sections");
let btnCountinue = document.getElementById("continue");
let btnAddDescribe = document.getElementById("addDescribe");
let btnChooseAlternative = document.getElementById("choose_alternative");
let btnResult = document.getElementById("result");
let btnAddName = document.getElementById("addName");
let classNumberCriterions = document.getElementsByClassName(
  "number_criterions"
);
let classDescribeSection = document.getElementsByClassName("describe_section");
let classCriterionDescription = document.getElementsByClassName(
  "criterion_description"
);
let classResult = document.getElementsByClassName("result");
let classSelectCriterion = document.getElementsByClassName("select_criterion");
let tableSpace = document.getElementsByClassName("tableSpace");
let classAddClasses = document.getElementsByClassName("add_classes");
let classAlgorithm = document.getElementById("algorithm");
let tableSpace2 = document.getElementsByClassName("tableSpace2");

let numberCriterion;

btnCountinue.onclick = function() {
  numberCriterion = document.getElementById("number_criterion").value;
  if (!numberCriterion) {
    return false;
  }

  classNumberCriterions[0].style.display = "none";
  classNameSections.style.display = "inline";

  let criterionsHtml = "<p>Name of criterions:</p>";
  for (let i = 0; i < numberCriterion; i++) {
    criterionsHtml =
      criterionsHtml +
      '<div class="criterion_describe"><input class="inputs" id="name_criterion' +
      i +
      '">' +
      '<button class="buttonsDescribe" id="describe' +
      i +
      '" data-id="' +
      i +
      '">Describe</button>' +
      "</div>";
  }
  criterionsHtml =
    criterionsHtml +
    '<br><button id="saveNames">Save</button>' +
    '<button id="choose_classes">Choose classes</button>';
  classNameSections.innerHTML = criterionsHtml;

  for (let i = 0; i < numberCriterion; i++) {
    $("#describe" + i).on("click", addEventToButtonDescribe);
  }
};

function addEventToButtonDescribe(e) {
  classNameSections.style.display = "none";
  classDescribeSection[0].style.display = "inline";

  let descriptionsHtml =
    "<p>Describe a criterion:</p>" +
    '<input class="criterion_description" data-order="0">' +
    '<input class="criterion_description" data-order="1"> ' +
    '<br><button id="saveDescriptions">Save</button>' +
    '<button id="addDescribe">Add description</button>' +
    '<button id="deleteDescribe">Delete last</button>' +
    '<button id="addName">All criterions</button>';

  classDescribeSection[0].innerHTML = descriptionsHtml;
}

let idBtnDescribe;
$("body").on("click", ".buttonsDescribe", function() {
  idBtnDescribe = $(this).attr("id");
});

let arrayValueInput;
$("body").on("click", "#saveNames", function() {
  arrayValueInput = new Array();

  for (let i = 0; i < numberCriterion; i++) {
    let val = document.getElementById("name_criterion" + i).value;
    arrayValueInput[i] = val;
  }
  console.log(arrayValueInput);
});

let arrayValueDescriptions;
let arrayValueAllDescriptions = new Array();
$("body").on("click", "#saveDescriptions", function() {
  let numberSoleDescription = document.getElementsByClassName(
    "criterion_description"
  );
  let numInputsDesc = idBtnDescribe[idBtnDescribe.length - 1];

  arrayValueDescriptions = new Array();
  arrayValueAllDescriptions[numInputsDesc] = new Array();

  for (let i = 0; i < numberSoleDescription.length; i++) {
    arrayValueDescriptions.push(numberSoleDescription[i].value);
    arrayValueAllDescriptions[numInputsDesc][i] = arrayValueDescriptions[i];
  }
});

let numberInputsDesc;
$("body").on("click", "#addDescribe", function() {
  let numberInputsDesc = document.getElementsByClassName(
    "criterion_description"
  ).length;
  if (numberInputsDesc < 5) {
    let lastInput = $(".describe_section .criterion_description").last();
    lastInput.after('<input class="criterion_description"> ');
    numberInputsDesc++;
  }
});

let numInputsDesc = classCriterionDescription.length;
$("body").on("click", "#deleteDescribe", function() {
  let numberInputsDesc = document.getElementsByClassName(
    "criterion_description"
  ).length;
  if (numberInputsDesc > 2) {
    let deleteDescribe =
      classCriterionDescription[classCriterionDescription.length - 1];
    deleteDescribe.parentNode.removeChild(deleteDescribe);
    numInputsDesc--;
    numberInputsDesc--;
  }
});

$("body").on("click", "#addName", function() {
  classDescribeSection[0].style.display = "none";
  classNameSections.style.display = "inline";
});

$("body").on("click", "#choose_classes", function() {
  classNameSections.style.display = "none";
  classAddClasses[0].style.display = "inline";

  let addClassesTableHtml =
    '<table id="table_classes"><tboby>' +
    "<tr><th>Classes</th></tr></tbody></table>" +
    "<br><button id='saveClasses'>Save</button>" +
    "<button id='checkClasses'>Check the accuracy</button>";
  tableSpace[0].innerHTML = addClassesTableHtml;

  let tbody = document
    .getElementById("table_classes")
    .getElementsByTagName("tbody")[0];

  for (let i = 0; i < 15; i++) {
    let row = document.createElement("TR");
    let td0 = document.createElement("TD");
    let newInput = document.createElement("input");
    newInput.className = "classesInputs";
    td0.appendChild(newInput);
    tbody.appendChild(row);
    row.appendChild(td0);
  }
});

// input 10 values from classes from table1
let classesInputsValue = new Array().fill(0);
$("body").on("click", "#saveClasses", function() {
  let classesInputs = document.getElementsByClassName("classesInputs");

  for (let i = 0; i < 15; i++) {
    classesInputsValue[i] = classesInputs[i].value;
  }
});

$("body").on("click", "#checkClasses", function() {
  classAddClasses[0].style.display = "none";
  classAlgorithm.style.display = "inline";
  tableSpace2[0].style.display = "none";

  let count = [];
  for (let i = 0; i < arrayValueAllDescriptions.length; i++) {
    count[i] = arrayValueAllDescriptions[i].length;
  }

  setTimeout(Main(Number(numberCriterion), count), 5000);
});

// dist
function dist(a, b) {
  let sum = 0.0;
  for (let i = 0; i < b.length; i++) {
    sum += Math.abs(a[i] - b[i]);
  }
  return sum;
}

// find center of class
function find_C(alts, G, n) {
  let k = 0;
  let sum = new Array(alts[0].length).fill(0);
  for (let i = 0; i < G.length; i++) {
    if (G[i] === n) {
      for (let j = 0; j < alts[0].length; j++) {
        sum[j] += alts[i][j];
      }
      k++;
    }
  }

  let res = new Array(alts[0].length);
  for (let i = 0; i < alts[0].length; i++) {
    res[i] = sum[i] / k;
  }
  return res;
}

// k1, k2, kn
function FindAlt2(count, p, k, alts) {
  for (let i = 0; i < count[k]; ++i) {
    p[k] = i + 1;
    if (k + 1 == count.length) {
      let a = new Array(count.length);
      for (let j = 0; j < count.length; ++j) {
        a[j] = p[j];
      }
      // alts[0].push(a);
      alts.push(a);
    } else {
      FindAlt2(count, p, k + 1, alts);
    }
  }
}

// k1, k2, kn
function FindAlt(count) {
  let alts = [];
  let p = new Array(count.length);
  FindAlt2(count, p, 0, alts);

  console.log(alts);
  return alts;
}

// number of string with Fmax
function pos_max(F) {
  let max = 0;
  let res = 0;

  for (let i = 0; i < F.length; i++) {
    if (F[i] > max) {
      max = F[i];
      res = i;
    }
  }
  return res;
}

// better and worse alts
function CompAlt(alts, k) {
  let b = new Array(alts.length);

  b.fill(1, 0, k);
  b.fill(2, k + 1);

  for (let i = 0; i < alts.length; i++) {
    for (let j = 0; j < alts[0].length; j++) {
      if (
        (i < k && alts[i][j] > alts[k][j]) ||
        (i > k && alts[i][j] < alts[k][j])
      ) {
        b[i] = 0;
        break;
      }
    }
  }
  b[k] = 3;

  return b;
}

function Main(N, count) {
  // N = 2;
  // count = [3, 3];
  let alts = FindAlt(count);
  N = alts.length;

  let G = new Array(N).fill(0);
  G[0] = 1;
  G[N - 1] = 2;
  var al = [...alts];
  al.pop();
  al.shift();
  let tmpVal = 0;
  let tableHTML = "";
  let tableID = 1;

  while (G.includes(0)) {
    let C1 = find_C(alts, G, 1),
      C2 = find_C(alts, G, 2);
    let d1 = new Array(N).fill(0),
      d2 = new Array(N).fill(0);
    for (let i = 0; i < N; ++i) {
      d1[i] = Math.floor((dist(alts[i], C1)) * 100) / 100;
      d2[i] = Math.floor((dist(alts[i], C2)) * 100) / 100;
    }
    let D = Math.max(Math.max(...d1), Math.max(...d2));
    let p1 = new Array(N).fill(0),
      p2 = new Array(N).fill(0);
    for (let i = 0; i < N; ++i) {
      switch (G[i]) {
        case 0:
          p1[i] = Math.floor((D - d1[i]) / (2 * D - d1[i] - d2[i]) * 100) / 100;
          break;
        case 1:
          p1[i] = 1;
          break;
        case 2:
          p1[i] = 0;
          break;
      }
      p2[i] = Math.floor((1 - p1[i]) * 100) / 100;
    }
    let g1 = new Array(N).fill(0),
      g2 = new Array(N).fill(0);

    let in_find = (a, b) => {
      for (let i = 0; i < a.length; ++i)
        if (String(a[i]) == String(b)) return i;
      return -1;
    };

    let countFunc = (k, w) => {
      let res = 0;
      for (let val of w) if (val === k) res++;
      return res;
    };

    for (let i = 0; i < al.length; ++i) {
      let z = CompAlt(al, i);
      g1[in_find(alts, al[i])] = countFunc(1, z);
      g2[in_find(alts, al[i])] = countFunc(2, z);
    }

    let F1 = new Array(N).fill(0),
      F2 = new Array(N).fill(0),
      F = new Array(N).fill(0);
    for (let i = 0; i < N; ++i) {
      F1[i] = Math.floor((p1[i] * g1[i]) * 100) / 100;
      F2[i] = Math.floor((p2[i] * g2[i]) * 100) / 100;
      F[i] = Math.floor((F1[i] + F2[i]) * 100) / 100;
    }

    var arrTable = [];
    for (let i = 0; i < count.length; ++i) {
      arrTable[i] = new Array();
    }
    for (let i = 0; i < count.length; ++i) {
      for (let j = 0; j < alts.length; ++j) {
        arrTable[i].push(alts[j][i]);
      }
    }
    arrTable.push(G);
    arrTable.push(d1);
    arrTable.push(d2);
    arrTable.push(p1);
    arrTable.push(p2);
    arrTable.push(g1);
    arrTable.push(g2);
    arrTable.push(F1);
    arrTable.push(F2);
    arrTable.push(F);

    var tableAlternatives =
      '<table id="table_alternative' + tableID + '"><tboby><tr>';

    for (let i = 0; i < numberCriterion; i++) {
      tableAlternatives = tableAlternatives + "<th>K" + (i + 1) + "</th>";
    }
    tableAlternatives +=
      "<th>G</th><th>d1</th><th>d2</th><th>p1</th><th>p2</th><th>g1</th><th>g2</th><th>F1</th><th>F2</th><th>F</th> </tr>";
    tableHTML += tableAlternatives;
    tableAlternatives += "</tbody></table>";
    tableSpace2[0].innerHTML = tableAlternatives;

    let tbody = document
      .getElementById(`table_alternative` + tableID)
      .getElementsByTagName("tbody")[0];

    for (let i = 0; i < arrTable[0].length; i++) {
      let row = document.createElement("TR");
      tableHTML += "<tr>";
      for (let j = 0; j < arrTable.length; j++) {
        let td0 = document.createElement("TD");
        td0.appendChild(document.createTextNode(arrTable[j][i]));
        tableHTML += "<th>" + arrTable[j][i] + "</th>";
        tbody.appendChild(row);
        row.appendChild(td0);
      }
      tableHTML += "</tr>";
    }
    tableHTML += "</tbody></table><br><br>";

    let max = pos_max(F);
    G[max] = Number(classesInputsValue[tmpVal]);
    tmpVal++;
    al.splice(in_find(al, alts[max]), 1);

    let z = CompAlt(alts, max);
    for (let i = 0; i < N; ++i)
      if (z[i] == G[max]) {
        G[i] = G[max];
        if (in_find(al, alts[i]) != -1) al.splice(in_find(al, alts[i]), 1);
      }
  }

  let htmlAlgorithm = "Class of each alternative: <br>";
  for (let i = 0; i < arrTable[0].length; i++) {
    for (let j = 0; j < numberCriterion; j++) {
      htmlAlgorithm += arrTable[j][i];
    }
    htmlAlgorithm += ": " + G[i] + "<br>";
  }

  tableHTML += htmlAlgorithm;
  classAlgorithm.innerHTML = tableHTML;
}
