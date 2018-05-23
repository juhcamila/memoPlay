export class Login {
  public nome: string;
  public email: string;
  public dataNascimento:Date;
  public senha: string;

  constructor(nome: string, email: string, dataNascimento: Date, senha: string) {
    this.nome = nome;
    this.email = email;
    this.dataNascimento = dataNascimento;
    this.senha = senha;
  }

}