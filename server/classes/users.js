class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    const user = { id, name, room };
    this.users.push(user);

    return this.users;
  }

  getUser(id) {
    const user = this.users.filter((user) => user.id === id)[0];

    return user;
  }

  getUsers() {
    return this.users;
  }

  getUsersPerRooms(room) {
    const usersInRoom = this.users.filter((user) => user.room === room);
    return usersInRoom;
  }

  removeUser(id) {
    const removedUser = this.getUser(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}

module.exports = { Users };
