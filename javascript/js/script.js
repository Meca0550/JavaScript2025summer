const themes = {
  pirate: {
    who: ["Captain Redbeard", "A sneaky parrot", "The sea monster", "A lost sailor", "Blackbeard's ghost"],
    what: ["found treasure", "fought with cannons", "sailed through a storm", "buried gold", "sang a sea shanty"],
    where: ["on Skull Island", "under the sea", "in a haunted cave", "aboard the Black Pearl", "in the crow's nest"],
    when: ["during a full moon", "at dawn", "on Pirate Day", "at high tide", "after a rum party"]
  },
  space: {
    who: ["An alien commander", "An astronaut", "A space robot", "The Martian Queen", "A cosmic explorer"],
    what: ["discovered a new planet", "fought space pirates", "launched a rocket", "rebooted the AI", "got lost in space"],
    where: ["in the Andromeda galaxy", "on Mars", "inside a black hole", "at the space station", "in orbit"],
    when: ["in the year 3025", "during a meteor shower", "at zero gravity lunch", "on Space Day", "while time traveling"]
  },
  fairy: {
    who: ["A brave knight", "A wicked witch", "A talking dragon", "The fairy godmother", "A mischievous elf"],
    what: ["cast a spell", "rescued a princess", "found a magic sword", "flew over a rainbow", "battled trolls"],
    where: ["in an enchanted forest", "at the royal castle", "on a cloud", "inside a giant mushroom", "under the rainbow"],
    when: ["long ago", "at midnight", "on a magical Tuesday", "during a fairy ball", "just before dawn"]
  },
  safari: {
    who: ["A curious lion", "A cheeky monkey", "A sleepy elephant", "A speedy cheetah", "A wise old giraffe"],
    what: ["climbed a tree", "stole bananas", "went for a swim", "played tag", "roared loudly"],
    where: ["in the savannah", "by the river", "inside the zoo", "at the watering hole", "under the baobab tree"],
    when: ["at sunset", "this morning", "during lunch", "on Safari Day", "after a nap"]
  },
  stem: {
    who: ["A scientist", "A coder", "An engineer", "A math whiz", "A robot"],
    what: ["built a robot", "invented an app", "solved a problem", "coded a website", "launched a drone"],
    where: ["in the lab", "at a tech fair", "in a smart classroom", "inside a computer", "on Mars Base Alpha"],
    when: ["during science week", "on Friday", "in 2050", "at hackathon night", "while debugging"]
  }
};

let currentTheme = "pirate";
let storyState = { who: "", what: "", where: "", when: "" };
const storyTextEl = document.getElementById("story-text");

function getThemeData() {
  return themes[currentTheme];
}

function generatePart(part) {
  const phrases = getThemeData()[part];
  const random = phrases[Math.floor(Math.random() * phrases.length)];
  storyState[part] = random;
  updateStory();
}

function updateStory() {
  const { who, what, where, when } = storyState;
  const sentence = [who, what, where, when].filter(Boolean).join(" ");
  storyTextEl.innerText = sentence || "Start building your story by clicking a button!";
}

function resetStory() {
  storyState = { who: "", what: "", where: "", when: "" };
  updateStory();
}

function surpriseStory() {
  Object.keys(storyState).forEach(generatePart);
}

function speakStory() {
  const text = storyTextEl.innerText;
  if (!text || text.includes("Start building")) return;
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

// Event Listeners
document.querySelectorAll("button[data-part]").forEach(button => {
  button.addEventListener("click", () => {
    const part = button.getAttribute("data-part");
    generatePart(part);
  });
});

document.getElementById("btn-reset").addEventListener("click", resetStory);
document.getElementById("btn-surprise").addEventListener("click", surpriseStory);
document.getElementById("btn-speak").addEventListener("click", speakStory);

// Theme switching
document.getElementById("theme").addEventListener("change", function () {
  currentTheme = this.value;
  resetStory();
});
