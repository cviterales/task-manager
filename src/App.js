import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Signin from "./containers/Signin/index";
import Spinner from "./components/Spinner/index";
import withAuth from "./hoc/withAuth";

const Home = lazy(() => import("./containers/Home/index"));
const Calendario = lazy(() => import("./containers/Calendario/index"));
const Reclamos = lazy(() => import("./containers/Reclamos/Reclamos"));
const Reclamo = lazy(() => import("./containers/Reclamos/Reclamo/Reclamo"));
const Layout = lazy(() => import("./containers/Layout/index"));
const Client = lazy(() => import("./containers/Client/Client"));
const ClientSubAccount = lazy(() =>
  import("./containers/Client/ClientSubAccount/ClientSubAccount")
);
const Cuadrillas = lazy(() => import("./containers/Cuadrillas/Cuadrillas"));

function App() {
  const isUserAuthenticated = useSelector((state) => state.auth.logged);

  return (
    <div>
      <Suspense
        fallback={
          <div style={{ position: "absolute", left: "50%", top: "50%" }}>
            <Spinner />
          </div>
        }
      >
        <Route
          exact
          path="/"
          render={() => {
            return isUserAuthenticated ? (
              <Redirect to="/home" />
            ) : (
              <Redirect to="/" />
            );
          }}
        />
        <Switch>
          <Route path="/" exact component={Signin} />
          <Layout>
            <Route path="/home" component={Home} />
            <Route path="/client" component={Client} />
            <Route path="/client_sub_account" component={ClientSubAccount} />
            <Route path="/calendario" component={Calendario} />
            <Route path="/reclamos" component={Reclamos} />
            <Route path="/reclamo" component={Reclamo} />
            <Route path="/cuadrillas" component={Cuadrillas} />
          </Layout>
        </Switch>
      </Suspense>
    </div>
  );
}

export default withAuth(App);
