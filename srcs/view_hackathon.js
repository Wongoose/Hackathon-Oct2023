const tempUsers = [
    "zwong",
    "schuah",
    "skoh",
    "saleem",
    "nnorazma",
    "hwong",
    "jtan",
    "jng",
    "chenlee",
    "helee"
];

const submissionDialog = document.getElementById("submission-dialog");
const rewardDialog = document.getElementById("reward-dialog");

const submissionBtn = document.getElementById("submission-btn");
const rewardBtn = document.getElementById("reward-btn");

const closeButton = document.querySelector("dialog button");

// "Show the dialog" button opens the dialog modally
submissionBtn.addEventListener("click", () => {
  submissionDialog.showModal();
});

rewardBtn.addEventListener("click", () => {
  rewardDialog.showModal();
});

closeButton.addEventListener("click", () => {
    submissionDialog.close();
    rewardDialog.close();
});

const rewardSearchInput = document.getElementById("reward-search");
rewardSearchInput.setAttribute("list", "user-datalist");
let dataList = document.createElement("datalist");
dataList.style.backgroundColor = "FFFFFF"
dataList.id = "user-datalist";

rewardSearchInput.append(dataList);

for (let i = 0; i < 10; i++) {
    let addOption = document.createElement("option");
    addOption.append(tempUsers[i]);
    dataList.append(addOption);
}