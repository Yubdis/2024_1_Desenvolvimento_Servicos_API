<?php
    
    header("Content-type: application/json");

    if( isset($_REQUEST["buscar"]) ){
        try{
            $conn = mysqli_connect("localhost", "root", "", "loja");
            if ($conn){
                $result = mysqli_query($conn, "SELECT * FROM produto");
                $linhas = array();
                while( $row = mysqli_fetch_assoc($result) ){
                    $linhas[] = $row;
                }
                mysqli_close($conn);
    
                echo '{ "produtos" : '.json_encode($linhas).'}';
            }else{
                echo '{ "resposta" : "Erro ao connectar com o Banco de dados"}';
            }
        }catch(\Throwable $th){
            echo '{ "resposta" : "Erro ao consultar o Banco de dados"}';
        }

    }

    if( isset($_REQUEST["excluir"]) ){
        try{
            $conn = mysqli_connect("localhost", "root", "", "loja");
            if ($conn){
                $id = $_GET["id"];
                $result = mysqli_query($conn, "DELETE FROM produto WHERE id = $id");
                mysqli_close($conn);
                echo '{ "resposta" : "Produto Excluido com sucesso"}';
            }else{
                echo '{ "resposta" : "Erro ao connectar com o Banco de dados"}';
            }
        }catch(\Throwable $th){
            echo '{ "resposta" : "Erro ao consultar o Banco de dados"}';
        }

    }

    if( isset($_REQUEST["inserir"]) ){
        try{
            $conn = mysqli_connect("localhost", "root", "", "loja");
            if ($conn){
                $nome = $_POST["nome"];
                $preco = $_POST["preco"];
                $qtd = $_POST["qtd"];
                $sql = "INSERT INTO produto (nome, preco, quantidade) VALUES
                        ('$nome', $preco, $qtd ) ";
                $result = mysqli_query($conn, $sql);
                mysqli_close($conn);
                if ($result > 0){    
                    echo '{ "resposta" : "Produto inserido com sucesso"}';
                }else{
                    echo '{ "resposta" : "Erro ao connectar com o Banco de dados"}';
                }
            }
        }catch(\Throwable $th){
            echo '{ "resposta" : "Erro ao consultar o Banco de dados"}';
        }

    }


?>