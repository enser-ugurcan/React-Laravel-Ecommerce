import React from "react";
import { Alert } from "react-bootstrap";


function Page403(){

    return(
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card card-body">
                    <Alert variant="danger">
                    <Alert.Heading>Oh snap! You got an error! Page 403 | Forbidden</Alert.Heading>
                    <p>
                    Yes, you are reading this important warning message. This page is admin page. You are not admin :(
                    </p>
                    <hr />
                        </Alert>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Page403;