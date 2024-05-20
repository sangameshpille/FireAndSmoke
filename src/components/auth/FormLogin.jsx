import React from 'react';

const FormLogin = () => {
  return (
    <div className="card wow fadeIn" style={{ animationName: 'none', visibility: 'visible' }}>
      <form  noValidate>
        <div className="card-body">
          <div className="form-header grey">
            <h3>
              <i className="fas fa-user mt-2 mb-2"></i> Login
            </h3>
          </div>

          <div className="md-form">
            <i className="far fa-envelope grey-text"></i>
            <input type="text" name="username" id="orangeForm-email" className="form-control" />
          </div>

          <div className="md-form">
            <i className="fas fa-lock grey-text"></i>
            <input type="password" name="password" id="orangeForm-pass" className="form-control" />
          </div>

          <div className="text-center">
            <button className="btn red btn-lg waves-effect waves-light white-text" type="submit" >
              <span >
                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                Loading...
              </span>
              <span >Login</span>
            </button>
            <hr />
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormLogin;
