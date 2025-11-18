export const CustomerService = {
  getData() {
    return [
      {
        id: 1001,
        name: "Lisa",
        username: "Wong",
        country: "Canada",
        date: "2018-03-21",
        address: "1033 E Center St",
        email: "lisa.wong@example.com",
        phone: "123-456-7890",
      },
      {
        id: 1002,
        name: "Michael",
        username: "Smith",
        country: "Canada",
        date: "2022-07-15",
        address: "3489 Peachtree St",
        email: "m.smith@example.com",
        phone: "234-567-8901",
      },
      {
        id: 1003,
        name: "Angela",
        username: "Johnson",
        country: "Canada",
        date: "2016-05-30",
        address: "1089 Green St",
        email: "angela.johnson@example.com",
        phone: "345-678-9012",
      },
      {
        id: 1004,
        name: "Kevin",
        username: "Lee",
        country: "Canada",
        date: "2017-11-12",
        address: "4567 Maple Rd",
        email: "kevin.lee@example.com",
        phone: "456-789-0123",
      },
      {
        id: 1005,
        name: "Sarah",
        username: "Brown",
        country: "Canada",
        date: "2019-01-20",
        address: "7865 Cedar Ave",
        email: "sarah.b@example.com",
        phone: "567-890-1234",
      },
      // Add additional users as needed
      {
        id: 1016,
        name: "Mark",
        username: "Martin",
        country: "Canada",
        date: "2022-01-25",
        address: "2343 Beech Dr",
        email: "mark.martin@example.com",
        phone: "678-901-2345",
      },
      {
        id: 1017,
        name: "Elizabeth",
        username: "Clark",
        country: "Canada",
        date: "2014-10-20",
        address: "5674 Aspen Way",
        email: "elizabeth.clark@example.com",
        phone: "789-012-3456",
      },
      // Ensure each user is updated similarly
    ];
  },

  getCustomersSmall() {
    return Promise.resolve(this.getData().slice(0, 10));
  },

  getCustomersMedium() {
    return Promise.resolve(this.getData().slice(0, 50));
  },

  getCustomersLarge() {
    return Promise.resolve(this.getData().slice(0, 200));
  },

  getCustomersXLarge() {
    return Promise.resolve(this.getData());
  },

  getCustomers(params) {
    const queryParams = params
      ? Object.keys(params)
          .map(
            (k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
          )
          .join("&")
      : "";

    return fetch(
      "https://www.primefaces.org/data/customers?" + queryParams
    ).then((res) => res.json());
  },
};
