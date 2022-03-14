import "./styles.css";

const store = document.getElementById("store");
const counter = document.getElementById("counter");
const clicker = document.getElementById("clicker");
const timerCombo = document.querySelector("#time");

const state = {
  totalPoints: 0,
  points: 0,
  fortuneCost: 20,
  pointsPerClick: 1,
  autoClickPoints: 0,
  comboCountDwn: 60 * 1,
  modifiers: [
    {
      name: "fortune",
      cost: 150,
      canBeClicked: (state, modifier, index) => state.points >= modifier.cost,
      onClick: (state, settings, index) => {
        state.points -= settings.cost;
        state.pointsPerClick++;
        settings.cost *= 2;
        return state;
      }
    },
    {
      name: "autoclick",
      cost: 100,
      canBeClicked: (state, modifier, index) => state.points >= modifier.cost,
      onClick: (state, modifier, index) => {
        state.points -= modifier.cost;
        modifier.cost *= 2;
        state.autoClickPoints++;
        return state;
      }
    },
    {
      name: "combo",
      cost: 1,

      canBeClicked: (state, modifier, index) => state.points >= modifier.cost,
      onClick: (state, modifier, index) => {
        state.points -= modifier.cost;
        modifier.cost *= 15;
        let countTime = state.comboCountDwn,
          minutes,
          seconds;
        window.addEventListener("keydown", (event) => {
          if (event.key === "e") {
            minutes = parseInt(countTime / 60, 10);
            seconds = parseInt(countTime % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            timerCombo.textContent = minutes + ":" + seconds;

            state.pointsPerClick += 1;
            if (--countTime < 0) countTime = state.comboCountDwn;
          }
        });
        return state;
      }
    }
  ]
};

const addPoints = (points) => {
  state.points += points;
  state.totalPoints += points;
};

const updateCounter = () => {
  counter.innerHTML = `You have ${state.points} points!`;
};

const onClickClicker = () => {
  addPoints(state.pointsPerClick);
  updateCounter();
  updateStore();
};

const updateStore = () => {
  store.innerHTML = "";

  state.modifiers.forEach((modifier, index) => {
    const modifierElem = document.createElement("button");

    const canBeClicked = modifier.canBeClicked(state, modifier, index);

    modifierElem.style.backgroundColor = canBeClicked ? "pink" : "grey";
    modifierElem.classList.add("store-modifier");
    modifierElem.innerText = `${modifier.name} - cost: ${modifier.cost}`;

    const onClickModifier = () => {
      modifier.onClick(state, modifier, index);
      updateStore();
      updateCounter();
    };

    if (canBeClicked) modifierElem.addEventListener("click", onClickModifier);

    store.appendChild(modifierElem);
  });
};

clicker.addEventListener("click", onClickClicker);

updateCounter();
updateStore();

setInterval(() => {
  addPoints(state.autoClickPoints);
  updateCounter();
  updateStore();
}, 1000);
