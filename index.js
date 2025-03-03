// const handleSearch = () => {
//   console.log("Hello");
// };

const loadAllPhones = async () => {
  // console.log("Wow three Seconds gone....");
  document.getElementById("spinner").style.display = "none";

  // fetch("https://openapi.programming-hero.com/api/phones?search=iphone")
  //   .then((res) => res.json())
  //   .then((data) => console.log(data.data));

  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=iphone`
  );
  const data = await response.json();
  // console.log(data.data);
  displayAllPhones(data.data);
};

const displayAllPhones = (phones) => {
  console.log(phones);
};

const handleSearch = () => {
  document.getElementById("spinner").style.display = "block";
  setTimeout(function () {
    loadAllPhones();
  }, 2000);
};

loadAllPhones();
