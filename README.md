# Back-end de Geolocalização: Motor de Inteligência Espacial e Serviços de Rede

Uma aplicação robusta de back-end desenvolvida em Python e Django, projetada para funcionar como um microsserviço/API centralizador de inteligência geográfica. O sistema é especializado na captura, processamento estruturado e resolução espacial de dados de localização (GeoIP e coordenadas) no lado do servidor (*server-side*).

---

## 📌 Escopo do Sistema (Back-end)

Diferente de aplicações web tradicionais focadas em interface com o usuário, este projeto funciona como a **camada de inteligência e persistência geográfica** que serve dados limpos e processados para outros sistemas e APIs.

- **Serviços Core:** Resolução reversa de endereços de rede (`geoip`), normalização de payloads espaciais e barramento relacional para logs de acessos territoriais [25/08/2026].
- **Stack Técnico:** Python, Django Core, e preparação para acoplamento com banco de dados espacial (**PostGIS**).

---

## ⚙️ Arquitetura de Engenharia e Fluxo de Dados

O ecossistema adota padrões de projeto restritos para garantir isolamento e alta performance no tratamento de queries espaciais:

- **Camada de Serviço (`geoip/`):** Módulo desacoplado responsável por interceptar metadados de rede de requisições HTTPS e traduzir endereços IP brutos em coordenadas geográficas de aproximação territorial [25/08/2026].
- **Camada de Negócio (`geo/`):** Centraliza as regras de filtragem espacial, tratamento de exceções de requisições geográficas e orquestração dos modelos.
- **Engine Relacional:** Estruturado com migrações de dados ordenadas para garantir a integridade referencial dos logs e a rastreabilidade dos pontos de acesso.

### Estrutura Arquitetural do Repositório
```text
geolocalizacao/
├── core/              # Configurações globais do sistema, middlewares e rotas do back-end
├── geo/               # Regras de negócio do back-end e orquestração de views lógicas
├── geoip/             # Microsserviço interno isolado para engenharia reversa de IPs
├── .gitignore         # Isolamento de dependências e arquivos binários locais
├── db.sqlite3         # Banco de dados de testes locais (ignorado pelo versionamento)
├── manage.py          # Interface de linha de comando (CLI) para gerenciamento do back-end
└── README.md
```

---

## 🚀 Inicialização da Infraestrutura Local

### 1. Clonagem e Configuração do Ambiente Virtual
```bash
git clone https://github.com
cd geolocalizacao
python3 -m venv venv
source venv/bin/activate
pip install django
```

### 2. Compilação do Esquema Relacional e Execução
```bash
# Executa as migrações estruturais do banco de dados relacional
python3 manage.py migrate

# Inicializa o servidor de desenvolvimento do back-end no Debian WSL
python3 manage.py runserver
```

---

## 🛠️ Roadmap de Evolução para Engenharia de Dados Espaciais
Para transformar este back-end em uma solução de nível enterprise, os próximos passos técnicos incluem:
- **Portabilidade para Django-GeoIP2:** Integração com as bases de dados oficiais da MaxMind (`GeoLite2`) para ganho de precisão e performance na resolução de redes [25/08/2026].
- **Migração de Dados para PostGIS:** Substituição da engine padrão por um banco de dados espacial georreferenciado, movendo os cálculos de proximidade e junções espaciais (como `ST_Contains`) direto para o banco via SQL nativo.
- **Barramento de API REST (DRF):** Implementação do Django REST Framework para serializar as respostas geográficas em formato JSON puro, permitindo que qualquer front-end consuma os dados de geolocalização.
