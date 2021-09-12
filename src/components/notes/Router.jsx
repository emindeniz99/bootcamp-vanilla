import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import OneNotePage from "./Components/OneNotePage";
import { NoteProvider } from "./Context";
import { NoteApp } from "./NoteApp";

const NoteAppRouter = () => {
  return (
    <NoteProvider>
      <Router>
        <Switch>
          <Route exact path="/notes/:id">
            <Link to="/">go back</Link>
            <OneNotePage />
          </Route>
          <Route path="/">
            <NoteApp />
          </Route>
        </Switch>
      </Router>
    </NoteProvider>
  );
};

export default NoteAppRouter;
