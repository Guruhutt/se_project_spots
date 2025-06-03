class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "97b5d94e-2030-4e5f-8d5a-22aeac9eb64c",
      },
    }).then((res) => res.json());
  }

  // other methods for working with the API
}

export default Api;
