export default function ({ store, redirect, $cookies }) {
  if (!$cookies.get('firstVisit')) {
    $cookies.set('firstVisit', new Date(), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7 * 191
    })
    return redirect('/about')
  }
}
