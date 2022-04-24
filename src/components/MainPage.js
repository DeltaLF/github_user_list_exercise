import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchData, setDataPage } from "../actions/dataAction";
import { Link } from "react-router-dom";
import adminRender from "../render/adminRender";

const PAGE_SIZE = 10;
// 10 users / page

function MainPage(props) {
  useEffect(() => {
    if (props.dataLength > 0) {
      // no need to fetch again if data exists
      return;
    }
    props.fetchData();
  }, []);

  function renderList(usersData) {
    return usersData.map((oneData) => {
      return (
        <li key={oneData.id} className="list-group-item">
          <div className="card mb-3" style={{ maxWidth: "100%" }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  width={175}
                  src={oneData.avatar_url}
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h2 className="card-title">{oneData.login}</h2>
                  <p className="card-text">
                    Site Admin: {adminRender(oneData.site_admin)}{" "}
                  </p>
                  <p>
                    {" "}
                    <Link
                      to={`/detail/${oneData.login}`}
                      className="btn btn-success"
                    >
                      Detail
                    </Link>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
      );
    });
  }

  function renderPaginationButton(dataLength, dataPage) {
    let totalPages = Math.floor(dataLength / PAGE_SIZE);
    totalPages = totalPages > 5 ? 6 : totalPages;
    // only show 5 buttons at most
    const offSet = dataPage > 5 ? dataPage - 5 : 0;
    const emptyArray = new Array(totalPages).fill();
    return emptyArray.map((val, ind) => {
      const currentPage =
        parseInt(dataPage) === ind + offSet + 1 ? "active" : "";
      if (ind < 5) {
        return (
          <li className={`page-item ${currentPage}`} key={ind + 1}>
            <div className="page-link" onClick={changePageClick}>
              {ind + offSet + 1}
            </div>
          </li>
        );
      } else {
        return (
          <div className="mx-2 fs-5" key={ind + 1}>
            ...
          </div>
        );
      }
    });
  }

  function changePageClick(e) {
    if (e.target.innerText.charCodeAt() === 187) {
      // >>
      const maxPage = Math.ceil(props.dataLength / PAGE_SIZE);
      if (props.dataPage >= maxPage) {
        console.log(" it's last page");
        return;
      }
    }
    if (e.target.innerText.charCodeAt() === 171 && props.dataPage === 1) {
      // <<
      console.log("it's first page");
      return;
    }
    props.setDataPage(e.target.innerText);
  }

  return (
    <div className="container">
      <h2>All users</h2>
      <ul className="list-group">{renderList(props.usersData)}</ul>
      <nav aria-label="Page navigation" className="mt-3">
        <ul className="pagination">
          <li className="page-item">
            <div
              className="page-link"
              aria-label="Previous"
              onClick={changePageClick}
            >
              <span aria-hidden="true">&laquo;</span>
            </div>
          </li>
          {renderPaginationButton(props.dataLength, props.dataPage)}
          <li className="page-item">
            <div
              className="page-link"
              aria-label="Next"
              onClick={changePageClick}
            >
              <span aria-hidden="true">&raquo;</span>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function mapStateToProps(state) {
  // dataPage 1 : dataIndex 0~ PAGE_SIZE - 1
  // dataPage 2 : dataIndex PAGE_SIZE ~ 2*PAGESIZE -1
  const dataIndex = (parseInt(state.dataPage) - 1) * PAGE_SIZE;
  return {
    usersData: state.usersData.slice(dataIndex, dataIndex + PAGE_SIZE),
    dataPage: state.dataPage,
    dataLength: state.usersData.length,
  };
}

export default connect(mapStateToProps, { fetchData, setDataPage })(MainPage);
