export function mockLogin(username, password) {
  return new Promise((resolve, reject) => {
    const rand = Math.random();
    setTimeout(() => {
      if (rand < 0.6) {
        resolve({ status: 200, token: "fake-jwt-token" });
      } else if (rand < 0.8) {
        reject({ status: 400, message: "Invalid credentials" });
      } else {
        reject({ status: 500, message: "Server error. Please try again later." });
      }
    }, 1000); // Simulate network delay
  });
}