# click-context-helper

Service searches click's context (offer, partner and important parameters) in multiple trackers based on click_id and responds should click's context transfer to alfanet tracker (potentially other trackers).

# Requirenments

- docker 3

# Development
1. copy `.env_original` and make changes to 
    
    | Variable | Description |
    | ------ | ------ |
    | PG_HOST | postgres host to find clicks and configs |
    | PG_PASS | postgres host's password | 
    | AFFISE_API_KEY | Affise api key to find clicks |
2. run inside app directory `docker-compose up`

    app listening at port 3000

# Swagger
swagger documentation available at endpoint `/api/v1/docs/`
