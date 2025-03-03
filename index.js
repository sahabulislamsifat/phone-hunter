// const handleSearch = () => {
//   console.log("Hello");
// };

const loadAllPhones = async (status, searchText) => {
  // console.log("Wow three Seconds gone....");
  // console.log(searchText);
  document.getElementById("spinner").style.display = "none";

  // fetch("https://openapi.programming-hero.com/api/phones?search=iphone")
  //   .then((res) => res.json())
  //   .then((data) => console.log(data.data));

  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${
      searchText ? searchText : "iphone"
    }`
  );
  const data = await response.json();
  // console.log(data.data);

  if (status) {
    displayAllPhones(data.data);
  } else {
    displayAllPhones(data.data.slice(0, 6));
  }
};

const displayAllPhones = (phones) => {
  // console.log(phones);
  const phoneContainer = document.getElementById("phones-container");
  phones.forEach((mobile) => {
    // console.log(mobile);

    const div = document.createElement("div");
    div.className =
      "bg-white rounded shadow-xl overflow-hidden transform transition duration-500 hover:scale-105 border border-slate-300 w-72 p-5";

    div.innerHTML = `
        <img class="w-full h-56 object-cover bg-gray-200" src="${mobile.image}" alt="${mobile.phone_name}">
        <div class="p-4">
            <h2 class="text-2xl font-bold text-gray-900">${mobile.brand}</h2>
            <h3 class="text-lg text-gray-700 font-semibold mt-1">${mobile.phone_name}</h3>
            <p class="text-gray-600 mt-2">${mobile.slug}</p>
            <div class="mt-4 flex space-x-2">
                <button onclick="phoneDetails('${mobile.slug}')" class="flex-1 bg-blue-600 text-white py-2 rounded-sm hover:bg-blue-700 transition duration-300">View Details</button>
                <button class="flex-1 bg-gray-200 text-gray-700 py-2 rounded-sm hover:bg-gray-300 transition duration-300">Compare</button>
            </div>
        </div>`;

    phoneContainer.appendChild(div);
  });
};

const phoneDetails = async (slug) => {
  const response = fetch(
    `https://openapi.programming-hero.com/api/phone/${slug}`
  );
  const data = await (await response).json();
  // console.log(data.data);
  // console.log(slug);
  const modalContainer = document.getElementById("modal-container");

  modalContainer.innerHTML = `  <!-- Open the modal using ID.showModal() method -->
      <dialog id="my_modal_1" class="modal">
        <div class="modal-box">
          <h2 class="text-lg font-bold">${data.data.brand}</h2>
          <h3 class="text-lg font-bold">${data.data.phone_name}</h3>
          <p class="py-4">Press ESC key or click the button below to close</p>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>`;

  my_modal_1.showModal();
};

const handleShowAll = (status) => {
  document.getElementById("spinner").style.display = "block";
  setTimeout(function () {
    loadAllPhones((status = true));
  }, 2000);
};

const handleSearch = () => {
  document.getElementById("spinner").style.display = "block";
  const searchText = document.getElementById("search-box").value;
  setTimeout(function () {
    loadAllPhones(false, searchText);
  }, 2000);
};

loadAllPhones(false, "iphone");
