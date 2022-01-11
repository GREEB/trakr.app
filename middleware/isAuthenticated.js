export default function ({ store, redirect }) {
  console.log(process.env)
  if (!store.state.auth.loggedIn) {
    return redirect('/about')
  }
}
