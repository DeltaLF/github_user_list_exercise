import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchDataDetail } from "../actions/dataAction";
import adminRender from "../render/adminRender";

function DetailPage(props) {
  const userName = useParams().userName;
  useEffect(() => {
    props.fetchDataDetail(userName);
    // fetch data in componentDidMount
  }, []);

  function renderUserDeatil(userData) {
    // style="width: 18rem;"
    return (
      <div className="card">
        <div className=" d-flex justify-content-center">
          <img
            src={userData.avatar_url}
            className="card-img-top"
            alt="..."
            style={{ width: "50vh" }}
          />
        </div>

        <div className="card-body ">
          <h3 className="card-title text-center">{userData.name}</h3>

          {/* <p className="card-text">location: {userData.location}</p> */}
          {/* <p className="card-text">login: {userData.login}</p> */}
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">bio: {userData.bio}</li>
          <li className="list-group-item">
            blog:{" "}
            <a href={userData.blog} className="btn btn-outline-info m-2">
              Go
            </a>
          </li>
          <li className="list-group-item">location: {userData.location}</li>
          <li className="list-group-item">login: {userData.login}</li>
          <li className="list-group-item">
            admin: {adminRender(userData.site_admin)}
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="">
      <h2>User Detail Page</h2>
      {renderUserDeatil(props.userData)}
      <Link to="/" className="btn btn-primary mt-3">
        Back
      </Link>
    </div>
  );
}

function mapStateToProps(state) {
  console.log("mapStateToProps in detail", state);

  return { userData: state.userData };
}

export default connect(mapStateToProps, { fetchDataDetail })(DetailPage);
