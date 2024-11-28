<?php
// URL de origem
$url = "https://canaltech.com.br/rss";

// Nome base do arquivo baseado na origem (host) e data
$host = parse_url($url, PHP_URL_HOST);
$date = date('Y-m-d'); // Data atual no formato AAAA-MM-DD
$cacheFile = "{$host}_{$date}.xml";

// Verificar se o arquivo de cache já existe
if (file_exists($cacheFile)) {
    // Lê o conteúdo do arquivo de cache
    header("Content-Type: application/rss+xml; charset=UTF-8");
    echo file_get_contents($cacheFile);
} else {
    // Inicializa o cURL para buscar o conteúdo da URL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

    $response = curl_exec($ch);

    // Verifica erros na requisição
    if (curl_errno($ch)) {
        echo "Erro ao acessar a URL: " . curl_error($ch);
    } else {
        // Salvar o conteúdo no arquivo de cache
        if ($response) {
            file_put_contents($cacheFile, $response);
        }

        // Define o tipo de conteúdo como XML e exibe a resposta
        header("Content-Type: application/rss+xml; charset=UTF-8");
        echo $response;
    }

    // Fecha o recurso cURL
    curl_close($ch);
}
?>