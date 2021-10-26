import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import ResponsiveDrawer from "./components/common/ResponsiveDrawer";
import Auth from "./pages/auth";
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
import ProtectedRoute from "./components/common/ProtectedRoute";
import Rentalsofcustomer from "./pages/rentalsofcustomer";
require("dotenv").config();

function Routes() {
  console.log("backend api url: ", process.env.REACT_APP_API_URL);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/customers/view" />
        </Route>
        {/* authentication - signin and signup */}
        <Route exact path="/auth" component={Auth} />
        {/* <Route exact path="/home" component={Home} /> */}
        <ResponsiveDrawer>
          {/* view all customer details */}
          <ProtectedRoute
            exact
            path="/customers/view"
            component={CustomerView}
          />
          {/* create new customer */}
          <ProtectedRoute exact path="/customers/new" component={CustomerNew} />
          {/* edit details of existing customer */}
          <ProtectedRoute
            exact
            path="/customers/edit/:customerid"
            component={({ match }) => (
              <CustomerNew edit={true} customerId={match.params.customerid} />
            )}
          />
          <ProtectedRoute exact path="/movies/view" component={MovieView} />
          <ProtectedRoute exact path="/movies/new" component={MovieNew} />
          <ProtectedRoute exact path="/genres/view" component={GenreView} />
          <ProtectedRoute exact path="/genres/new" component={GenreNew} />
          <ProtectedRoute
            exact
            path="/rentals/customer/:customerid"
            component={({ match }) => <Rentalsofcustomer match={match} />}
          />
          <ProtectedRoute exact path="/rentals/view" component={RentalView} />
          <ProtectedRoute exact path="/rentals/new" component={RentalNew} />
          <ProtectedRoute exact path="/aboutus" component={About} />
          <ProtectedRoute exact path="/contact" component={Contact} />
        </ResponsiveDrawer>
      </Switch>
    </Router>
  );
}

export default Routes;
