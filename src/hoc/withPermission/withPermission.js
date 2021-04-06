import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import NoPermission from "../../components/NoPermission/NoPermission";

const withPermission = (WrappedComponent) => {
  const RequiresPermissions = (props) => {

    const user = useSelector((state) => state.auth.user);
    let returnComponent = <WrappedComponent {...props} />;
    if (!user?.isAdmin) {
      returnComponent = <NoPermission />;
    }
    return returnComponent;
  };

  return RequiresPermissions;
};

withPermission.propTypes = {
  WrappedComponent: PropTypes.node.isRequired,
};

export default withPermission;
