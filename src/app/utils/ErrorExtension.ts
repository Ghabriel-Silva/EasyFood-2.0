export default class ErrorExtension extends Error {
    status:number;

    constructor(status:number, message:string){
        super(message)
        this.status = status

          // Corrige o prototype para o instanceof funcionar
        Object.setPrototypeOf(this, ErrorExtension.prototype); //Aqui estamos dizendo explicitamente:"Essa instância (this) deve usar como protótipo o ErrorExtension.prototype."
    }
}