function validarForm(){
    conteudo = document.getElementById("txtNumero").value;
    if (isNaN(conteudo) || conteudo < 1 || conteudo > 10 ){
        document.getElementById("info").innerHTML = "Valor não permitido";
        return false;
    }else{
        return true;
    }
}

function somaNum(){
    num1 = document.getElementById("val1").value;
    num2 = document.getElementById("val2").value;
    if (isNaN(num1) || isNaN(num2) || !num1 || num2 =="" ){
        document.getElementById("detalhes").innerHTML = "Valor não permitido";
    }else{
        soma = Number(num1) + Number(num2);
        document.getElementById("detalhes").innerHTML = soma;
    }
}