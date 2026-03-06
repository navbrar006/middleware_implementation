let users = [
  {
    id: 1,
    username: "testuser",
    password: "$2a$10$WJ1M8A9j2l5H8xV3kD5P0evBzJ0sWQm7nU6FQ0H8wWm9sKxL0xR9W"
  }
];

export const User = {
  findByUsername(username) {
    return users.find((user) => user.username === username);
  },

  create(user) {
    users.push(user);
    return user;
  },

  getAll() {
    return users;
  }
};