import React from "react";
import { Alert } from "react-bootstrap";

function Page404(){

    return(
        <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card card-body">
                <Alert variant="success">
                <Alert.Heading>Oh snap! Page 404 | Page Not Found</Alert.Heading>
                <p>
                 Url / Page you are not searching not found
                </p>
                <hr />
                    </Alert>
                </div>
            </div>
        </div>

    </div>
        
    )
}

export default Page404;