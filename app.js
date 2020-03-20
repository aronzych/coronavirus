const spans = document.querySelectorAll("span");
const dataFields = document.querySelector(".dataFields");
const refresh = document.querySelector(".refresh__info");
const button = document.querySelector(".refresh__button");

const fillData = () => {
  let confirmed;
  let deaths;
  let recovered;

  dataFields.style.opacity = "0";
  button.style.transform = "rotate(360deg)";
  button.style.transition = ".6s";

  setTimeout(() => {
    fetch(
      "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=Poland",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
          "x-rapidapi-key": "94559d41b7msh3f3b79c572c5934p16aad7jsnbc941bdc9dd1"
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        time = new Date().toLocaleTimeString();
        // refreshDate = data.data.lastChecked.slice(0, 10);
        refreshDate = time;
        confirmed = data.data.covid19Stats[0].confirmed;
        deaths = data.data.covid19Stats[0].deaths;
        recovered = data.data.covid19Stats[0].recovered;

        spans.forEach(span => {
          const type = span.dataset.type;
          if (type === "confirmed") {
            span.innerText = confirmed;
          }
          if (type === "deaths") {
            span.innerText = deaths;
          }
          if (type === "recovered") {
            span.innerText = recovered;
          }

          refresh.innerText = refreshDate;
          dataFields.style.opacity = "1";
          button.style.transform = "rotate(0deg)";
          button.style.transition = "0s";
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, 300);
};

fillData();

button.addEventListener("click", fillData);
