export default function signIn() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'abcde12345',
        user: {
          name: 'Lucas',
          user_type: 'Dev',
        }
      });
    }, 2000);
  });
}
