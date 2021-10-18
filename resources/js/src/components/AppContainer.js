import React from 'react'
import {Link} from "react-router-dom";

const AppContainer = ({title,children}) => {
    return (
        <div className="AppContainer__container">


            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h4 className='text-center'>{title}</h4>
                    </div>
                    <div className="card-body">
                        {children}
                    </div>
                </div>
            </div>


        </div>
    );
};

export default AppContainer;

