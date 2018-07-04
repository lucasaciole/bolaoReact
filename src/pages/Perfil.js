import React from 'react';

class Perfil extends React.Component {


    constructor() {
        super();
        this.state = {
            usuario: null
        };
    }

    render() {
        return (
            <div className="row">
                <h1> Olá, pessoa!</h1>
            </div>
        );
    }
}


export default Perfil;