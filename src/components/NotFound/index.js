import React from "react";
import { Link } from "react-router-dom";
import './style.scss';

NotFound.propTypes = {};

function NotFound() {
  return (
    <div className="notFound">
      <h1>404</h1>
      <h2>Oopss ... Not found</h2>
      <p>The requested URL was not found on this server.</p>
      <p>
        Additionally, a 404 Not Found error was encountered while trying to use
        an ErrorDocument to handle the request.
      </p>
      <div className="backHome">
        {"You want to back to home page? "}
        <Link to="./">click here</Link>
      </div>
    </div>
  );
}

export default NotFound;
