import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ResponsiveDrawer from "./components/common/ResponsiveDrawer";
import Auth from "./pages/auth";
import Home from "./pages/home";
import CustomerNew from "./pages/customernew";
import CustomerView from "./pages/customerview";
import MovieNew from "./pages/movienew";
import MovieView from "./pages/movieview";
import GenreView from "./pages/genreview";
import GenreNew from "./pages/genrenew";
import RentalView from "./pages/rentalview";
import RentalNew from "./pages/rentalnew";
import About from "./pages/about";
import Contact from "./pages/contact";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/auth" component={Auth} />
        <ResponsiveDrawer>
          <Route exact path="/customers/view" component={CustomerView} />
          <Route exact path="/customers/new" component={CustomerNew} />
          <Route exact path="/movies/view" component={MovieView} />
          <Route exact path="/movies/new" component={MovieNew} />
          <Route exact path="/genres/view" component={GenreView} />
          <Route exact path="/genres/new" component={GenreNew} />
          <Route exact path="/rentals/view" component={RentalView} />
          <Route exact path="/rentals/new" component={RentalNew} />
          <Route exact path="/aboutus" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/" component={Home} />
        </ResponsiveDrawer>
      </Switch>
    </Router>
  );
}

export default Routes;
