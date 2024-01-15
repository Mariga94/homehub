// Fetch user data stored in local storage

interface IUser {
  _id: string;
  email: string;
  fullName: string;
}
export function fetchUserFromLocalStorage(): IUser | null {
  const user = JSON.parse(localStorage.getItem("user")!);
  return user;
}
