function add() {
    nome = document.getElementById("txtNome").value;
    if (nome.length == 0){
        alert("O nome deve ser preenchido");
    }else{
        ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                alert("Categoria "+nome+" cadastrada!");
                buscarCategorias();
            }else if(this.readyState == 4){
                alert(this.status +"\n"+this.responseText);
            }
        };

        ajax.open("POST", "http://localhost:8001/categorias", true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send("nome=" + nome);
    }
}

function buscarCategorias(){
    tabela = document.getElementById("tblCategorias");

    ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                obj = JSON.parse(this.responseText);
                obj.forEach(cat => {
                    if(document.getElementById("c"+ cat.id) == null){
                        linha = tabela.insertRow(-1);
                        linha.id = "c" + cat.id;
                        cellId = linha.insertCell(0);
                        cellNome = linha.insertCell(1);
                        cellExcluir = linha.insertCell(2);

                        cellId.innerHTML = cat.id;
                        cellNome.innerHTML = cat.nome;
                        cellExcluir.innerHTML = '<button onclick="excluir('+cat.id+')">'+ 
                                                'Excluir</button>';
                    }
                });
            }
        };

        ajax.open("GET", "http://localhost:8001/categorias", true);
        ajax.send();
}

function excluir(idCat){
    ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            location.reload;
        }
    }
    
    ajax.open("DELETE", "http://localhost:8001/categorias/"+idCat, true);
    ajax.send();

}

// function adicionar(){
//     nome = document.getElementById("txtNome").value;
//     if( nome.length == 0 ){
//         alert("O campo nome é obrigatório!");
//     }else{
//         ajax = new XMLHttpRequest();

//         ajax.onreadystatechange = function(){
//             if( this.readyState == 4 && this.status == 200){
//                 alert( nome + " cadastrado com sucesso!");
//                 buscarProdutos();
//             }else if(this.readyState == 4) {
//                 alert( this.status + " \n " + this.responseText );
//             }
//         };
//         ajax.open("POST", "http://localhost:8001/produtos", true );
//         ajax.setRequestHeader( "Content-type" ,
//             "application/x-www-form-urlencoded" );
//         preco = document.getElementById("txtPreco").value;
//         qtd =  document.getElementById("txtQuantidade").value;
//         ajax.send( "nome=" + nome +"&preco=" + preco +
//             "&quantidade=" + qtd);
//     }
// }

// function buscarProdutos(){
//     tabela = document.getElementById("tblProdutos");
//     ajax = new XMLHttpRequest();

//     ajax.onreadystatechange = function(){
//         if( this.readyState == 4 && this.status == 200){
//             obj = JSON.parse( this.responseText );
//             obj.forEach( prod => {
//                 if( document.getElementById( "p" + prod.id) == null){
//                     linha = tabela.insertRow( -1 );
//                     linha.id = "p" + prod.id ;

//                     cellId = linha.insertCell( 0 );
//                     cellNome = linha.insertCell( 1 );
//                     cellPreco = linha.insertCell( 2 );
//                     cellQtd = linha.insertCell( 3 );
//                     cellExcluir = linha.insertCell( 4 );

//                     cellId.innerHTML = prod.id;
//                     cellNome.innerHTML = prod.nome;
//                     cellPreco.innerHTML = prod.preco;
//                     cellQtd.innerHTML = prod.quantidade;
//                     cellExcluir.innerHTML =
//                     "<button onclick='excluir(" + prod.id + ")'>" +
//                     "Excluir</button>";
//                 }
//             });

//         }
//     };
//     ajax.open("GET", "http://localhost:8001/produtos", true);
//     ajax.send();
// }

// function excluir( idProd ){
//     ajax = new XMLHttpRequest();

//     ajax.onreadystatechange = function(){
//         if( this.readyState == 4 && this.status == 200){
//            buscarProdutos();
//         }
//     };
//     ajax.open("DELETE", "http://localhost:8001/produtos/" + idProd, true);
//     ajax.send();
// }