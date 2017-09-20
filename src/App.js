import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import SignIn from './SignIn/SignIn'
// import Forgot from './Forgot/Forgot'
// import Home from './Home/Home'
// import { view as User } from './User/'
// import { view as SignUP } from './SignUp/'
import { view as Writer } from './Writer/'
// import { view as ArticlePage } from './ArticlePage/'
// import { view as Setting } from './Setting/'
// import { view as Attention } from './Attention/'
// import { view as Favorite } from './Favorite/'
// import User from './User/User'

import Bundle from './Bundle'
const Home = (props) => (
  <Bundle load={() => import('./Home/Home.js')}>
      {(Home) => <Home {...props}/>}
  </Bundle>
);
const SignUp = (props) =>(
  <Bundle load={() => import('./SignUp/SignUP.js')}>
      {(SignUp) => <SignUp {...props}/>}
  </Bundle>
)
const SignIn = (props) =>(
  <Bundle load={() => import('./SignIn/SignIn.js')}>
      {(SignIn) => <SignIn {...props}/>}
  </Bundle>
)
const Forgot = (props) =>(
  <Bundle load={() => import('./Forgot/Forgot.js')}>
      {(Forgot) => <Forgot {...props}/>}
  </Bundle>
)
const User = (props) =>(
  <Bundle load={() => import('./User/User.js')}>
      {(User) => <User {...props}/>}
  </Bundle>
)
// const Writer = (props) =>(
//   <Bundle load={() => import('./Writer/Writer.js')}>
//       {(Writer) => <Writer {...props}/>}
//   </Bundle>
// )
const ArticlePage = (props) =>(
  <Bundle load={() => import('./ArticlePage/ArticlePage.js')}>
      {(ArticlePage) => <ArticlePage {...props}/>}
  </Bundle>
)
const Setting = (props) =>(
  <Bundle load={() => import('./Setting/Setting.js')}>
      {(Setting) => <Setting {...props}/>}
  </Bundle>
)
const Attention = (props) =>(
  <Bundle load={() => import('./Attention/Attention.js')}>
      {(Attention) => <Attention {...props}/>}
  </Bundle>
)
const Favorite = (props) =>(
  <Bundle load={() => import('./Favorite/Favorite.js')}>
      {(Favorite) => <Favorite {...props}/>}
  </Bundle>
)

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/sign_in" component={SignIn} />
          <Route path='/sign_up' component={SignUp} />
          <Route path='/forgot' component={Forgot} />
          <Route path="/writer" component={Writer} />
          <Route path="/user/:userId" component={User} />
          <Route path="/article/:articleId" component={ArticlePage} />
          <Route path="/setting" component={Setting} />
          <Route path="/attention/:userId" component={Attention} />
          <Route path="/favorite/:userId" component={Favorite} />
        </Switch>
      </Router>
    );
  }
}

export default App;
