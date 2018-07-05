import React from 'react';

class Perfil extends React.Component {


    constructor() {
        super();
        this.state = {
            id: '',
            usuarioEncontrado: null,
            mostrarLogin: true,
            mostrarDetalhes: false,
            mostrarAjaxLoader: false,
            nome: '',
            email: '',
            senha: '',
            confirmarSenha: '',
            telefone: '',
            dataDeNascimento: null,
            mensagem: 'Digite seu e-mail para dar início',
            mensagemClassName: 'alert alert-info',
            mensagensValidacao: {
                email: '',
                senha: '',
                nome: '',
                telefone: '',
                dataDeNascimento: '',
                confirmarSenha: '',
            }
        };
    }

    handleUserInput(e) {
        const nome = e.target.name;
        const valor = e.target.value;
        this.setState({
            [nome]: valor,
        });
    }

    mostrarAjaxLoader() { this.setState({ mostrarAjaxLoader: true }); }
    ocultarAjaxLoader() { this.setState({ mostrarAjaxLoader: false }); }
    mostrarAviso(mensagem) { this.setState({ mensagem, mensagemClassName: 'alert alert-warning', }); }
    mostrarInfo(mensagem) { this.setState({ mensagem, mensagemClassName: 'alert alert-info', }); }
    mostrarSucesso(mensagem) { this.setState({ mensagem, mensagemClassName: 'alert alert-success', }); }
    mostrarErro(mensagem) { this.setState({ mensagem, mensagemClassName: 'alert alert-danger', }); }

    async handleAutenticarClicked() {
        if (this.state.mostrarLogin) {
            this.mostrarAjaxLoader();
            try {
                const response = await fetch('http://localhost:8080/BolaoDaCopaV2/webresources/usuario?email=' + this.state.email);
                var contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const usuarioJson = await response.json();
                    this.setState({
                        usuarioEncontrado: usuarioJson
                    });
                    if (this.state.senha === this.state.usuarioEncontrado.senha) {
                        const d = new Date(this.state.usuarioEncontrado.dataDeNascimento.slice(0, -5));
                        this.setState({
                            id: this.state.usuarioEncontrado.id,
                            nome: this.state.usuarioEncontrado.nome,
                            telefone: this.state.usuarioEncontrado.telefone,
                            dataDeNascimento: d.toISOString().slice(0, 10),
                        });
                        this.setState(
                        { mostrarLogin: false,
                          mostrarDetalhes: true,
                        });
                        this.mostrarSucesso('Seja bem-vindo!');
                    } else {
                        this.setState(
                        { mostrarLogin: true,
                          mostrarDetalhes: false,
                        });
                        this.mostrarErro('Senha incorreta! Informe novamente!');
                    }
                    this.ocultarAjaxLoader();
                } else {
                    this.mostrarInfo('E-mail não encontrado! Tente novamente.');
                }
            } catch (e) {
                this.mostrarErro('Ocorreu um problema!');
                console.log(e);
            }
        }
    }


    render() {
        return (
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h4 className={(this.state.mostrarDetalhes ? "": "hidden")}>Editar Informações</h4>
                    <div className="loginForm">
                        <form className="form-horizontal" name="formPalpite">
                            <div className={this.state.mensagemClassName}>
                                {this.state.mensagem}
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label" htmlFor="email">E-mail</label>
                                <div className="col-sm-4">
                                    <input type="email"
                                        className="form-control"
                                        name="email"
                                        label="E-mail"
                                        value={this.state.email}
                                        onChange={(event) => this.handleUserInput(event)}>
                                    </input>
                                    <span className="text text-danger">{this.state.mensagensValidacao['email']}</span>
                                </div>
                                <label className={"col-sm-2 control-label " + (this.state.mostrarLogin ? "": "hidden")} htmlFor="senha">Senha</label>
                                <div className={"col-sm-4 " + (this.state.mostrarLogin ? "": "hidden")}>
                                    <input type="password"
                                        className="form-control"
                                        name="senha"
                                        label="Senha"
                                        value={this.state.senha}
                                        onChange={(event) => this.handleUserInput(event)}>
                                    </input>
                                    <span className="text text-danger">{this.state.mensagensValidacao['senha']}</span>
                                </div>
                            </div>

                            <div className={"form-group " + (this.state.mostrarLogin ? "": "hidden")}>
                                <div className="col-sm-12">
                                     <a className="btn btn-default"
                                        name="enviar"
                                        onClick={() => this.handleAutenticarClicked()}>
                                        Entrar
                                    </a>
                                </div>
                            </div>
                            <div className={"form-group " + (this.state.mostrarDetalhes ? "": "hidden")}>
                                <label className="col-sm-2 control-label" htmlFor="nome">Nome completo</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                        className="form-control"
                                        name="nome"
                                        label="Nome"
                                        value={this.state.nome}
                                        onChange={(event) => this.handleUserInput(event)}/>
                                    <span className="text text-danger">{this.state.mensagensValidacao['nome']}</span>
                                </div>
                            </div>
                            <div className={"form-group " + (this.state.mostrarDetalhes ? "": "hidden")}>
                                <label className="col-sm-2 control-label" htmlFor="telefone">Telefone</label>
                                <div className="col-sm-4">
                                    <input type="text"
                                        className="form-control"
                                        name="telefone"
                                        label="Telefone"
                                        value={this.state.telefone}
                                        onChange={(event) => this.handleUserInput(event)}/>
                                    <span className="text text-danger">{this.state.mensagensValidacao['telefone']}</span>
                                </div>
                                <label className="col-sm-3 control-label" htmlFor="dataDeNascimento">Data de nascimento</label>
                                <div className="col-sm-3">
                                    <input type="date"
                                        className="form-control"
                                        name="dataDeNascimento"
                                        label="Data de nascimento"
                                        value={this.state.dataDeNascimento}
                                        onChange={(event) => this.handleUserInput(event)}>
                                    </input>
                                    <span className="text text-danger">{this.state.mensagensValidacao['dataDeNascimento']}</span>
                                </div>
                            </div>
                            <div className={"form-group " + (this.state.mostrarDetalhes ? "": "hidden")}>
                                <label className="col-sm-2 control-label" htmlFor="novaSenha">Nova senha</label>
                                <div className="col-sm-4">
                                    <input type="password"
                                        className="form-control"
                                        name="novaSenha"
                                        label="Nova senha"
                                        value={this.state.novaSenha}
                                        onChange={(event) => this.handleUserInput(event)}/>
                                </div>
                                <label className="col-sm-2 control-label" htmlFor="confirmarSenha">Confirme a senha nova</label>
                                <div className="col-sm-4">
                                    <input type="password"
                                        className="form-control"
                                        name="confirmarSenha"
                                        label="Confirmação de nova senha"
                                        value={this.state.confirmarSenha}
                                        onChange={(event) => this.handleUserInput(event)}/>
                                </div>
                            </div>

                            <div className={"form-group " + (this.state.mostrarDetalhes ? "": "hidden")}>
                                <div className="col-sm-12">
                                     <a className="btn btn-default"
                                        name="enviar"
                                        >
                                        Salvar
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


export default Perfil;